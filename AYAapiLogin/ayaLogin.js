const api_list = require('../AYAApiLists/apis')

const express = require('express');
const request = require('request');
const router = express.Router()

router.get('/get', (req, res) => {
    request(url, (err, response, body) => {
        console.log(response.body)
    })
})


