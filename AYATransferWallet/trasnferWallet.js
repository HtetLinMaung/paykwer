const api_list = require('../AYAApiLists/apis')

const express = require('express');
var axios = require('axios');
var qs = require('qs');
const { response } = require('express');
const router = express.Router()
const WalletTransfer = router.post('/wallet/transfer', (req, res) => {

    axios.post("http://localhost:5000/api/aya/loginAYA", {
        phone: "09677102111",
        password: "123321"

    })
        .then((response) => {

            var data = qs.stringify({
                'serviceCode': 'AGENTPAYMERCHANT',
                'depositorPhone': '09686021096',
                'depositorName': 'Mary',
                'amount': '1000',
                'externalTransactionId': 'A100011',
                'currency': 'MMK',
                'externalAdditionalData': 'Fill bill detail here',
                'qrcode': '000201514800245f07f8fa64f6b81c611ca235011620008153300760830102115802MM5908RN OWNER6006Kachin624403245f111740d69da2cc4801de150512080300584861641600020108RN OWNER6304c30a',
                'deviceId': 'stone34667778starlight'
            });


            var config = {
                method: 'post',
                url: `${api_list.transcation_api}`,
                headers: {
                    'Token': `Bearer ${response.data.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Language': 'en',
                    'Authorization': `Bearer ${response.data.user_token}`
                },
                data: data
            };
            axios(config)
                .then(function (response1) {
                    const data = response1.data
                    console.log(data)
                    res.json({ payload: data, error: 200, message: "your cash has been transfered sucessfully" })
                })
                .catch(function (error) {
                    res.json({ err: error, errorcode: 201 })
                });
        })
        .catch((err) => console.log(err))


})

const confirmTransaction = router.post('/confirm', (req, res) => {
    axios.post("http://localhost:5000/api/aya/loginAYA", {
        phone: "09677102111",
        password: "123321"

    })
    
        .then((response) => {
            var data = qs.stringify({
                'serviceCode': 'AGENTPAYMERCHANT',
                'depositorPhone': '09686021096',
                'depositorName': 'Mary',
                'amount': '1000',
                'externalTransactionId': 'A10002',
                'currency': 'MMK',
                'externalAdditionalData': 'Fill bill detail here',
                'qrcode': '000201010211513900245f05b18164f6b81c61ceefd7018200081445802MM5908MANHQUAN6006Yangon622803245f05b181559b9d4240a5f5eb64180002en0108MANHQUAN63042f4e',
                'message': ' pay bill'
            });
            var config = {
                method: 'post',
                url: `${api_list.confirm_transcation}`,
                headers: {
                    'Token': `Bearer ${response.data.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Language': 'en',
                    'Authorization': `Bearer ${response.data.user_token}`
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    const data = response.data
                    res.json({ err: 200, message: "you have just confirmed", data: data })
                })
                .catch(function (error) {
                    res.json({ err: 201, message: "your confirmation failed" })
                })
        })

});


module.exports = { WalletTransfer, confirmTransaction }
