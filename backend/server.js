import * as dotenv from "dotenv";
import * as path from "path";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")));
}

app.get("/test", (req, res) => {
  res.send("Server work");
});

app.listen(PORT, () => {
  console.log(`all right  ${PORT}`);
});
