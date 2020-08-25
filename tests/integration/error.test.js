const error = require('../../middleware/error');
let server;
const request = require('supertest');
const path = require('path');
const config = require('config');
const db = require('../../database/db');
const productPathFile = path.join(db.__dirname, config.get('db'));
const fs = require('fs').promises;

describe('error', () => {

    beforeEach(async () => {
        server =  require('../../index');
        await fs.truncate(productPathFile, 0);
    });

    afterEach(()=>{
        server.close();
    })

    it('should return 500 if there is any issue accessing the database', async () => {
        const res = await request(server).get('/api/products/');
        
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('There is some issue at server side');
    });
});

