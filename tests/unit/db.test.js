const db = require('../../database/db');
const fs = require('fs').promises;

describe('readFromDB', () => {
    it('should return json data from the database', async () => {

        fs.readFile = jest.fn().mockImplementationOnce(() => {
            return [{}];
        });

        JSON.parse = jest.fn().mockImplementationOnce();

        await db.readFromDB();

        expect(fs.readFile).toHaveBeenCalled();
        expect(JSON.parse).toHaveBeenCalledWith([{}]);

    });

    it('should throw if readFile or JSON.parse methods throws expection', async () => {
        try {
            await db.readFromDB();
        }
        catch (ex){
            expect(ex).toThrow();
        }
    });
});

describe('writeToDB', () => {
    it('should write json data to the database', async () => {
        JSON.stringify = jest.fn().mockImplementationOnce();
        fs.writeFile = jest.fn().mockImplementationOnce();

        await db.writeToDB([{}]);

        expect(fs.writeFile).toHaveBeenCalled();;
        expect(JSON.stringify).toHaveBeenCalledWith([{}]);
    });

    it('should throw if writeFile or JSON.stringify methods throws expection', async () => {
        try {
            await db.writeToDB();
        }
        catch(ex) {

            expect(ex).toThrow();
        }
    });
});