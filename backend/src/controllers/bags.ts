import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { db } from "../db";
import { openai } from "../openai";
import { RiskLevel } from "../types";
import { DbBag, DbToken } from "../types/db";
import { RespBag } from "../types/resp";
import { learnToken } from "../utils";

export const getBags = async (req: Request, res: Response) => {
  const stmt1 = db.prepare("SELECT * FROM bags");
  const dbBags = stmt1.all() as DbBag[];

  const bags: RespBag[] = dbBags.map((dbBag) => {
    const stmt2 = db.prepare(
      "SELECT t.*, bt.percentage FROM bag_tokens as bt JOIN tokens as t ON t.rowid == bt.token_rowid WHERE bag_rowid = ?"
    );
    const dbTokens = stmt2.all(dbBag.rowid) as (DbToken & {
      percentage: number;
    })[];

    return {
      id: dbBag.id,
      name: dbBag.name,
      description: dbBag.description,
      imageUrl: dbBag.image_url,
      riskLevel: dbBag.risk_level as RiskLevel,
      tokenAmounts: dbTokens.map((dbToken) => ({
        token: {
          id: dbToken.id,
          symbol: dbToken.symbol,
          address: dbToken.address,
          name: dbToken.name,
          description: dbToken.description,
          color: dbToken.color,
          imageUrl: dbToken.image_url,
          riskLevel: dbToken.risk_level as RiskLevel,
        },
        percentage: dbToken.percentage,
      })),
    };
  });

  res.json({
    data: bags,
  });
};

export const createBag = async (req: Request, res: Response) => {
  const tokensInBag: { symbol: string; percentage: number }[] = [];
  if (req.body.symbol1)
    tokensInBag.push({
      symbol: req.body.symbol1,
      percentage: req.body.percentage1,
    });
  if (req.body.symbol2)
    tokensInBag.push({
      symbol: req.body.symbol2,
      percentage: req.body.percentage2,
    });
  if (req.body.symbol3)
    tokensInBag.push({
      symbol: req.body.symbol3,
      percentage: req.body.percentage3,
    });
  if (req.body.symbol4)
    tokensInBag.push({
      symbol: req.body.symbol4,
      percentage: req.body.percentage4,
    });
  if (req.body.symbol5)
    tokensInBag.push({
      symbol: req.body.symbol5,
      percentage: req.body.percentage5,
    });

  const gptResp = await openai.responses.create({
    model: "gpt-4o-mini",
    input:
      'I will describe you a crypto asset bundle consisting of Ethereum tokens. I will give you the token symbol and percentage for each token. You will respond to me with a JSON conforming to this interface: { name: string; description: string; riskLevel: "low" | "medium" | "high" }. You should come up with a fun and cool name and description, aimed for a crypto trader audience. Description can only be one sentence. Tokens that are widely traded and have more liquidity are safer, like stablecoins and tokens backed by big companies. Tokens that have less liquidity are more dangerous, like meme tokens. Here are the tokens in the bundle:\n' +
      tokensInBag
        .map((token) => `${token.symbol}, ${token.percentage}`)
        .join("\n"),
  });
  const { name, description, riskLevel } = JSON.parse(
    gptResp.output_text.slice(7, -3).trim()
  );

  const stmt2 = db.prepare(
    "INSERT INTO bags (id, name, description, image_url, risk_level) VALUES (?, ?, ?, ?, ?)"
  );
  const info = stmt2.run(
    nanoid(),
    name,
    description,
    `https://picsum.photos/seed/${name}/800`, // TODO Generate image based on name with AI
    riskLevel
  );

  for (const bagToken of tokensInBag) {
    const stmt1 = db.prepare("SELECT * FROM tokens WHERE symbol = ?");
    const dbToken = stmt1.get(bagToken.symbol) as DbToken | undefined;

    let dbTokenRowid;
    if (dbToken) {
      dbTokenRowid = dbToken.rowid;
    } else {
      dbTokenRowid = await learnToken(bagToken.symbol);
    }

    const stmt3 = db.prepare(
      "INSERT INTO bag_tokens (bag_rowid, token_rowid, percentage) VALUES (?, ?, ?)"
    );
    stmt3.run(info.lastInsertRowid, dbTokenRowid, bagToken.percentage);
  }

  res.status(201).end();
};
