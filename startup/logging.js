module.exports = function() {

    process.on('uncaughtException', (ex) => {
        throw ex;
    });

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}