const express = require("express");
const axios = require("axios");
const qs = require("qs");
const router = express.Router();

router.post("/loginAYA", (req, res) => {
  let access_token;
  let user_token;
  axios
    .post(
      "https://opensandbox.ayainnovation.com/token",
      qs.stringify({
        grant_type: "client_credentials"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic TXd6d2JrNUpic2dkb241R0Z2aXFWanZ2WDNrYTprcnYxM0NsdjlOdWNFaThxdml2Q2cxemluQm9h"
        }
      }
    )
    .then((response) => {
      access_token = response.data.access_token;
      axios
        .post(
          "https://opensandbox.ayainnovation.com/agent/1.0.0/thirdparty/agent/login",
          {
            phone: req.body.phone,
            password: req.body.password
          },
          {
            headers: {
              Token: `Bearer ${response.data.access_token}`
            }
          }
        )
        .then((response2) => {
          user_token = response2.data.token.token;
          res.json({ access_token, user_token });
        });
      //   axios.post(
      //     "https://opensandbox.ayainnovation.com/agent/1.0.0/thirdparty/agent/enquiryTransaction",
      //     {
      //       //     serviceCode
      //       // ServiceCode
      //       // depositorPhone
      //       // depositorName
      //       // qrcode
      //       // amount number
      //       // externalTransactionId
      //       // externalAdditionalData
      //       // currency
      //     },
      //     {}
      //   );
    })
    .catch((err) => console.log(err));

  res.json([]);
});

module.exports = router;
