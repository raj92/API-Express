

// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');	
const assert 		 = require('assert');

const multer = require('multer');	

const port = 8000;

var fs = require("fs");

app.use(express.static('public'));
app.use(bodyParser.json()); // very important

app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  //require('./app/routes')(app, database);

  // Make sure you add the database name and not the collection name
  dbb = database.db('lc');
  require('./app/routes')(app, dbb);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
});

