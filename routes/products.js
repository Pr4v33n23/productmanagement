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
    const product = products.find( p => p.productId ===  parseInt(req.params.id));
    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `product with Id:${req.params.id} does not exist`,
        "data": []
    });

    res.status(200).json({
        "statusCode": 200,
        "status": "sucess",
        "message": "product data found",
        "data": [product]
    });
});

//router.post()
//router.put()

router.delete('/:id', async(req, res) => {
    const data = await fs.readFile(productPathFile);
    const products = JSON.parse(data);
    const product = products.find( p => p.productId === parseInt(req.params.id))
    if(!product) return res.status(404).json({
        "statusCode": 404,
        "status": "failure",
        "message": `product with Id:${req.params.id} does not exist`,
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
});

module.exports = router;