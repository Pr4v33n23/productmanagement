const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());


require('./startup/routes')(app);

const server =  app.listen(PORT, () => {
    console.log(
        `Express Server running on port ${app.get('port')} | Environment : ${app.get('env')}`
    );
});

module.exports = server;