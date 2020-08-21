
const fs = require('fs').promises;
const path = require('path');
const productPathFile = path.join(__dirname, './productdata.json');

async function readFromDB () {
    try{
        const data = await fs.readFile(productPathFile, 'utf8');
        return JSON.parse(data);
    }
    catch(ex){
        throw new Error(ex.message);
    }   
};

async function writeToDB(products){
    try {
        await fs.writeFile(productPathFile, JSON.stringify(products));
    }
    catch(ex){
        throw new Error(ex.message);
    }
};

exports.readFromDB = readFromDB;
exports.writeToDB = writeToDB;