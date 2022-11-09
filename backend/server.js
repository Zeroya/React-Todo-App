import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/frontend/build"));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "/frontend/build/index.html")));
}

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`all right ${PORT}`);
});
