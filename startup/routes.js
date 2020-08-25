const products = require('../routes/products');
const express = require('express');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/products', products);
    app.use(error);
}