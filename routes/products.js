const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async(req, res) => {
    const data = await fs.readFile(path.join(__dirname, '../productdata.json'));
    const products = JSON.parse(data);
    res.status(200).send;
    res.json({
        "statusCode": 200,
        "status": "success",
        "message": "all product data",
        "data": products
    });
});

module.exports = router;