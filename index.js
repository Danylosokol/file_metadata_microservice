var express = require('express');
var cors = require('cors');
require('dotenv').config();
//let mongoose = require('mongoose');
let bodyParser = require('body-parser');
//let fs = require('fs');
let formidable = require('formidable');
//let multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});



app.post("/api/fileanalyse", function(req, res){
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    console.log(files.upfile.originalFilename);
    console.log(files.upfile.mimetype);
    console.log(files.upfile.size);
    res.json({
      name: files.upfile.originalFilename,
      type: files.upfile.mimetype,
      size: files.upfile.size
    });
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
