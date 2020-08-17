const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const asyncMiddleWare = require('../middleware/async');
const productPathFile = path.join(__dirname, '../productdata.json');

//Get all products
router.get('/', asyncMiddleWare(async(req, res) => {
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
}));

//Get product by given ID
router.get('/:productId', asyncMiddleWare (async( req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const product = products.find( p => p.productId ===  parseInt(req.params.productId));
    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `product with ID:${req.params.productId} does not exist`,
        "data": []
    });

    res.status(200).json({
        "statusCode": 200,
        "status": "success",
        "message": "product data found",
        "data": [product]
    });
}));

router.post('/', asyncMiddleWare (async (req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const newProduct = {
    "productId": req.body.productId,
    "productName": req.body.productName,
    "productCode": req.body.productcode,
    "releaseDate": req.body.releaseDate, 
    "description": req.body.description,
    "price": req.body.price,
    "starRating": req.body.starRating,
    "imageUrl": req.body.imageUrl 
    }

    const product = products.find( p => p.productId === parseInt( req.body.productId))

    if(product) return res.status(400).json({
        "statusCode": 400,
        "status": "failure",
        "message": `product with ID:${req.body.productId} already exists. Please provide different ID`,
        "data": []
    });

    products.push(newProduct);

    fs.writeFile(productPathFile, JSON.stringify(products));

    res.status(201).json({
            "statusCode": 201,
            "status": "success",
            "message": "product data added successfully",
            "data": [newProduct]
    });
}));


router.put('/:productId', asyncMiddleWare(async(req, res) => {

    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const product = products.find( p => p.productId === parseInt(req.params.productId));

    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `product with ID:${req.params.productId} does not exist`,
        "data": []
    });

    product.productName = req.body.productName;
    product.productCode  = req.body.productcode;
    product.releaseDate  = req.body.releaseDate;
    product.description =  req.body.description;
    product.price =  req.body.price;
    product.starRating =  req.body.starRating;
    product.imageUrl =  req.body.imageUrl;
    
    fs.writeFile(productPathFile, JSON.stringify(products));

    res.status(201).json({
        "statusCode": 201,
        "status": "success",
        "message": "product data added successfully",
        "data": [product]
    });
}));

//Delete product by given ID
router.delete('/:productId', asyncMiddleWare(async(req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const product = products.find( p => p.productId === parseInt(req.params.productId));
    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `product with ID:${req.params.productId} does not exist`,
        "data": []
    });

    const index = products.indexOf(product);
    const deletedProduct = products.splice(index, 1);
    if(deletedProduct) {
        fs.writeFile(productPathFile, JSON.stringify(products));
        return res.status(200).json({
            "statusCode": 200,
            "status": "Success",
            "message": "product data removed successfully",
            "data": [deletedProduct]    
        });
    }   
}));

module.exports = router;