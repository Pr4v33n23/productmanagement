const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());


require('./startup/routes')(app)

app.listen(PORT, () => {
    console.log(
        `Express Server running on port ${app.get('port')} | Environment : ${app.get('env')}`
    );
});