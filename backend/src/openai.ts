import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
