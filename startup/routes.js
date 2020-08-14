const home = require('../routes/home');
const products = require('../routes/products');
const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/products', products);

}