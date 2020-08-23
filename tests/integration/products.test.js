let server;
let products = [];
const request = require('supertest');
const path = require('path');
const config = require('config');
const db = require('../../database/db');
const productPathFile = path.join(db.__dirname, config.get('db'));
const fs = require('fs').promises;
const route = '/api/products/'


describe('api/products', () => {

    beforeEach( async () => { 
        server =  require('../../index');

        newProduct = {
            "productId": 3,
            "productName": "jigsaw",
            "productCode": "JGX-0048",
            "releaseDate": "May 21, 2019",
            "description": "Rugged Machine saw",
            "price": 12.9,
            "starRating": 4.9,
            "imageUrl": "https://images.homedepot-static.com/productImages/7a93112a-67d3-4775-8c38-9c36207c5058/svn/estwing-claw-hammers-e3-16c-64_1000.jpg"
        }
        products.push(newProduct);

        await fs.writeFile(productPathFile, JSON.stringify(products));

        const data =  await fs.readFile(productPathFile);
        products = JSON.parse(data);
    });
    afterEach(  async () => {
        server.close();
        products = [];
        await fs.writeFile(productPathFile, JSON.stringify(products));
        });

    describe('GET /',  () => {
        it('should return 404 if no products present', async ()=> {
            products = [];
            await fs.writeFile(productPathFile, JSON.stringify(products));

            const res = await request(server).get(route);
            console.log(res.body);
            expect(res.status).toBe(404);

        })
        it('should return all genres', async () => {

            const res = await request(server).get(route);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('all product data');
            expect(res.body.data.length).toBe(products.length);
        });
    });
    describe('GET /:id', () => {
        it('should return a product if valid id is passed', async () => {
            const id = products[0].productId;
            const res = await request(server).get(route + id);

            expect(res.status).toBe(200);
            expect(res.body.data.productName).toBe(products.productName);
            expect(res.body.message).toBe('product data found');
        });
        it('should return 404 if invalid id is passed', async() => {

            const res = await request(server).get(route + '1qwd');
            
            expect(res.status).toBe(404);
            expect(res.body.message).toBe(`product with ID:1qwd does not exist`);
        });
    });
    describe('POST /', () => {
        it('should return 400 if the product with ID already exists', async () => {

            const newProduct = {
                "productId": 3,
                "productName": "jigsaw",
                "productCode": "JGX-0048",
                "releaseDate": "May 21, 2019",
                "description": "Rugged Machine saw",
                "price": 12.9,
                "starRating": 4.9,
                "imageUrl": "https://images.homedepot-static.com/productImages/7a93112a-67d3-4775-8c38-9c36207c5058/svn/estwing-claw-hammers-e3-16c-64_1000.jpg"
            }

            const res = await request(server).post(route).send(newProduct);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe(`product with ID:${newProduct.productId} already exists. Please provide different ID`);

        });

        it('should return 201 if the product is added successfully', async () => {

            newProduct = {
                "productId": 6,
                "productName": "screw-driver",
                "productCode": "SCD-0048",
                "releaseDate": "Jul 23, 2020",
                "description": "screw-driver",
                "price": 7.9,
                "starRating": 4.1,
                "imageUrl": "https://images.homedepot-static.com/productImages/7a93112a-67d3-4775-8c38-9c36207c5058/svn/estwing-claw-hammers-e3-16c-64_1000.jpg"
            }

            const res = await request(server).post(route).send(newProduct);

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('product data added successfully');
            expect(res.body.data).toStrictEqual([newProduct]);
        });

    });
});