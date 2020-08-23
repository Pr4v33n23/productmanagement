
const fs = require('fs').promises;
const path = require('path');
const config = require('config');
const productPathFile = path.join(__dirname, config.get('db'));

async function readFromDB () {
    try{
        const data = await fs.readFile(productPathFile, 'utf8');
        return JSON.parse(data);
    }
    catch(ex){
        throw ex;
    }   
};

async function writeToDB(products){
    try {
        await fs.writeFile(productPathFile, JSON.stringify(products));
    }
    catch(ex){
        throw ex;
    }
};

exports.readFromDB = readFromDB;
exports.writeToDB = writeToDB;
exports.__dirname = __dirname;