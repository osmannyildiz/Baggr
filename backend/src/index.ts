import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({ path: ".env.local" });

app.listen(process.env.PORT, () =>
  console.log(`⚙️ API is listening on :${process.env.PORT}`)
);
