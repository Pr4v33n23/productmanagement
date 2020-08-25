module.exports = function(err, req, res, next){

    res.status(500).json({
            "statusCode": 500,
            "status": "failure",
            "message": 'There is some issue at server side',
            "data": []
    });
};