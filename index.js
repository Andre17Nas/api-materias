'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config');
const materiaRoute = require('./routes/materiaroutes')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use('/api', materiaRoute.routes);

app.listen(config.port, ()=> console.log('App is listening on url https://localhost:' + config.port))
