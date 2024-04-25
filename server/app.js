const express = require("express");

const app = express();
//

app.use("/api/user", userRouter);
module.exports = app;
