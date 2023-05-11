const express = require("express");
require("dotenv").config();
const DBUtils = require("./utils/dbutils");

const userRouter = require("./routes/user_route");
const authRouter = require("./routes/auth_route");
const tagRouter = require("./routes/tag_route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tag", tagRouter);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
