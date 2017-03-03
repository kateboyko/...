const express = require('express');
const app        = express();
const path       = require('path');
const formidable = require('formidable');
const fs         = require('fs');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const passport   = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const ejs = require('ejs');

function checkAuth (req, res, next) {
  console.log('checkAuth ' + req.url);
  if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }
  next();
}

app.use(cookieParser);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'example'
}));
app.use(express.static('./public'));
app.use(checkAuth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./lib/[disabled]routes.js')(app);
require('./auth')(passport);

const connection = mysql.createConnection({
  host        : 'localhost',
  user        : 'test',
  password    : 'root',
  database    : 'shpp_pr'
});

connection.connect(function(err) {
  if(err) console.log(err);
  else console.log("Connected to DB.");
});

// connection.query('insert into users (`id`, `name`, `login`, `email`, `password`, `userpic`, `admin`, `deleted`, `skype`, `specialization`) VALUES (\'2\', \'kate\', \'kboyko9\', \'kboyko9@la.la\', \'lalala\', \'????????????\', \'1\', \'0\', \'kboyko99\', \'developer\')', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The result is: ', results);
// });


app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
