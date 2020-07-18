const api_list = require('../AYAApiLists/apis')

const express = require('express');
const request = require('request');
var axios = require('axios');
var qs = require('qs');
const router = express.Router()

const readAyaInform = router.get('/get', (req, res) => {

    axios
        .post(
            `${api_list.api_get_acces_token}/token`,
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
            response.json({ payload: JSON.stringify(response.data), error: 200 })
        })
        .catch((err) => response.json({ err: error, errorcode: 201 }));


})

const WalletTransfer = router.get('/wallet/transfer', (req, res) => {

    var data = qs.stringify({
        'serviceCode': 'AGENTPAYMERCHANT',
        'depositorPhone': '09686021096',
        'depositorName': 'Mary',
        'amount': '1000',
        'externalTransactionId': 'HD100011',
        'currency': 'MMK',
        'externalAdditionalData': 'Fill bill detail here',
        'qrcode': '000201514800245f07f8fa64f6b81c611ca235011620008153300760830102115802MM5908RN OWNER6006Kachin624403245f111740d69da2cc4801de150512080300584861641600020108RN OWNER6304c30a',
        'deviceId': ''
    });
    var config = {
        method: 'post',
        url: `${api_list.transcation_api}`,
        headers: {
            'Token': `Bearer {{accessToken}}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'en',
            'Authorization': 'Bearer {{token}}'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            const data = JSON.stringify(response.data)

            response.json({ amount: data.Data.amount, discount: data.Data.discount, fee: data.Data.fee, total: data.Data.total, error: 200, message: "your cash has been transfered sucessfully" })
        })
        .catch(function (error) {
            response.json({ err: error, errorcode: 201 })
        });
})

const confirmTransaction = router.get('/confirm', (req, res) => {
    var data = qs.stringify({
        'serviceCode': 'AGENTPAYMERCHANT',
        'depositorPhone': '09686021096',
        'depositorName': 'Mary',
        'amount': '1000',
        'externalTransactionId': 'HD10001',
        'currency': 'MMK',
        'externalAdditionalData': 'Fill bill detail here',
        'qrcode': '000201010211513900245f05b18164f6b81c61ceefd7018200081445802MM5908MANHQUAN6006Yangon622803245f05b181559b9d4240a5f5eb64180002en0108MANHQUAN63042f4e',
        'message': ' pay bill'
    });
    var config = {
        method: 'post',
        url: `${api_list.confirm_transcation}`,
        headers: {
            'Token': 'Bearer {{accessToken}}',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'en',
            'Authorization': 'Bearer {{token}}'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            const data = JSON.stringify(response.data)
            response.json({ err: 200, message: "you have just confirmed", data: data })
        })
        .catch(function (error) {
            res.json({ err: 201, message: "your confirmation failed" })
        })
});


module.exports = { readAyaInform, WalletTransfer,confirmTransaction }
