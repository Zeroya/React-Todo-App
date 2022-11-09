import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile("/build/index.html", { root: path.join(__dirname, "../frontend") }));
}

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`all right ${PORT}`);
});
