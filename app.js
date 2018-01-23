const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const email = require('./routes/email');

const credentials = require('./config.json');

const serviceAccount = require(credentials.privateKey.path);
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: credentials.firebase.database.url,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/signup', email);

app.get('*',function(req,res){
 return res.json({
   response: 0,
   msg: '404',
 });
});

app.post('*',function(req,res){
 return res.json({
   response: 0,
   msg: '404',
 });
});

// 404 Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
