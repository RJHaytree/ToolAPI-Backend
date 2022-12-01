const express = require('express');
const logger = require('morgan');
const toolsRouter = require('./routes/tools');
const toolCategoryRouter = require('./routes/toolCategory');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const azureBlobService = require('./services/azureBlobService');

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
azureBlobService.init();

const swaggerDefinition = {
    info: {
        title: 'Tool API',
        version: '1.0.0',
        description: 'A simple API for managing tools'
    },
    host: 'localhost:8900',
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/tools', toolsRouter);
app.use('/toolCategory', toolCategoryRouter);

app.use((req, res) => {
    res.status(404).send("Sorry page not found!");
});

module.exports = app;