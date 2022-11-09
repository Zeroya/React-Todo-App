import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const app = express();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname + "/../frontend/build/index.html")));
}

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`all right ${PORT}`);
});
