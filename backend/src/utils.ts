import { nanoid } from "nanoid";
import { db } from "./db";
import { openai } from "./openai";

export const learnToken = async (symbol: string) => {
  const gptResp = await openai.responses.create({
    model: "gpt-4o-mini",
    input:
      'I will give you the symbol of a token on Ethereum. You will respond to me with a JSON conforming to this interface: { description: string; riskLevel: "low" | "medium" | "high" }. You should come up with a fun and cool description, aimed for a crypto trader audience. Description can only be one sentence. Tokens that are widely traded and have more liquidity are safer, like stablecoins and tokens backed by big companies. Tokens that have less liquidity are more dangerous, like meme tokens.\nHere is the token\'s symbol:\n' +
      symbol,
  });
  const { description, riskLevel } = JSON.parse(
    gptResp.output_text.slice(7, -3).trim()
  );

  const stmt1 = db.prepare(
    "INSERT INTO tokens (id, symbol, address, description, image_url, risk_level) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const info = stmt1.run(
    nanoid(),
    symbol,
    "0xTODO" + symbol,
    description,
    `https://picsum.photos/seed/${symbol}/256`, // TODO Get real token image
    riskLevel
  );

  return info.lastInsertRowid;
};
