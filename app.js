
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
const readAyaInform = require('./AYATransferWallet/trasnferWallet')
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
    app.use('/api/ayapay', readAyaInform.readAyaInform)
    app.use('/', readAyaInform.WalletTransfer)
    app.use('/', readAyaInform.confirmTransaction)
    app.use("/api/auth/", require("./routes/AuthRoute"));
    app.use(require("./middlewares/handle-error"));
  })
  .catch((err) => console.log(err));

