
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_CONNECTION, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    app.use("api/auth/", require("./routes/AuthRoute"));
  })
  .catch((err) => console.log(err));

