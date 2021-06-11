'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('bodyparser');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.listen(config.port, ()=> console.log('App is listening on url https://localhost:' + config.port))
