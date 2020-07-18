const express = require("express");
const axios = require("axios");
const qs = require("qs");
const api_list = require('../AYAApiLists/apis')
const { v4 } = require("uuid");
const router = express.Router();

router.post("/loginAYA", (req, res) => {
  let access_token;
  let user_token;
  axios
    .post(
      `${api_list.api_get_acces_token}`,
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
      console.log(response);
      access_token = response.data.access_token;
      axios
        .post(
          `${api_list.login_api}`,
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
          console.log(response2);
          user_token = response2.data.token.token;
          res.json({ access_token, user_token });
        });
    })
    .catch((err) => console.log(err));
});

router.post("/enquiryTransaction", (req, res) => {
  axios
    .post(
      "https://opensandbox.ayainnovation.com/agent/1.0.0/thirdparty/agent/enquiryTransaction",
      qs.stringify({
        serviceCode: "AGENTTRANSFERTONRIC",
        depositorPhone: req.body.depositorPhone,
        depositorName: req.body.depositorName,
        beneficiaryNric: req.body.beneficiaryNric,
        beneficiaryPhone: req.body.beneficiaryPhone,
        beneficiaryName: req.body.beneficiaryName,
        amount: req.body.amount,
        externalTransactionId: `${v4()}`,
        externalAdditionalData: req.body.externalAdditionalData,
        message: req.body.message,
        currency: req.body.currency
      }),
      {
        headers: {
          Authorization: `Bearer ${req.body.user_token}`,
          Token: `Bearer ${req.body.access_token}`,
          "Accept-Language": "en",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/confirmTransaction", (req, res) => {
  axios
    .post(
      "https://opensandbox.ayainnovation.com/agent/1.0.0/thirdparty/agent/confirmTransaction",
      qs.stringify({
        serviceCode: "AGENTTRANSFERTONRIC",
        depositorPhone: req.body.depositorPhone,
        depositorName: req.body.depositorName,
        beneficiaryNric: req.body.beneficiaryNric,
        beneficiaryPhone: req.body.beneficiaryPhone,
        beneficiaryName: req.body.beneficiaryName,
        amount: req.body.amount,
        externalTransactionId: `${v4()}`,
        externalAdditionalData: req.body.externalAdditionalData,
        message: req.body.message,
        currency: req.body.currency
      }),
      {
        headers: {
          Authorization: `Bearer ${req.body.user_token}`,
          Token: `Bearer ${req.body.access_token}`,
          "Accept-Language": "en",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
