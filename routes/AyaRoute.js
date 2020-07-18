const express = require("express");
const axios = require("axios");
const router = express.router();

router.post("/enquiryTransaction", (req, res) => {
  axios.post(
    "https://opensandbox.ayainnovation.com/agent/1.0.0/thirdparty/agent/enquiryTransaction"
  );
});

module.exports = router;
