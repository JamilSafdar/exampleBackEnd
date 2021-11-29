require("./db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/user.routes");
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get("/health", (req, res) => {
  res.send("Alive");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});