require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router = require("./routes");
app.get("/", (req, res) => {
  res.send("Hello");
  return;
});
app.use("/api", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
