const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send(`
    <h1><center>Welcome to Product management</center></h1>    
    <div class = 'container'>
        <p>
            Available routes are:
        </p>
            <ul>
                <li>api/products - to get all products</li>
                <li>api/products - POST </li>
                <li>api/products/:id - to get a product by its ID</li>
                <li>api/products/:id - to update a product by its ID</li>
                <li>api/products/:id - to delete a product by its ID</li>
            </ul>
    </div>
    `);
});

module.exports = router;