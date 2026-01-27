const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const apiRouter = require("../routes/api.route");
const { logger } = require("../middleware/logger");

app.use(logger);

app.use("/api", apiRouter);

const mongoURL =
  "mongodb+srv://sallu2004mkt_db_user:qScniugwZiJo6ne7@cluster0.hnozqxf.mongodb.net/Students?appName=mongosh+2.5.10";

mongoose.connect(mongoURL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
