const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const productPathFile = path.join(__dirname, '../productdata.json');

//Get all products
router.get('/', async(req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    if(products.length === 0) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `no data found`,
        "data": []
    });

    res.status(200).json({
        "statusCode": 200,
        "status": "success",
        "message": "all product data",
        "data": products
    });
});

//Get product by given ID
router.get('/:id', async( req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const product = products.find( p => p.productId ===  Number(req.params.id));
    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `Product with Id:${req.params.id} does not exist`,
        "data": []
    });

    res.status(200).json({
        "statusCode": 200,
        "status": "sucess",
        "message": "product data found",
        "data": [product]
    });
});


module.exports = router;