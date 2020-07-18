require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb://paykwer_user:p%40ssw0rd@paykwercluster-shard-00-00.ujn4g.mongodb.net:27017,paykwercluster-shard-00-01.ujn4g.mongodb.net:27017,paykwercluster-shard-00-02.ujn4g.mongodb.net:27017/paykwer?ssl=true&replicaSet=atlas-x521ni-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    app.get("/", (req, res) => {
      res.json({ message: "success" });
    });

    app.use("/api/auth/", require("./routes/AuthRoute"));
    app.use("/api/aya/", require("./routes/AyaRoute"));
    app.use((err, req, res, next) => {
      const message = err.message;
      const statusCode = err.statusCode || 500;
      const data = err.data;
      res.json({ message, statusCode, data });
    });
  })
  .catch((err) => console.log(err));
