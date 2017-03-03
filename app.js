const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express.createServer();

function checkAuth (req, res, next) {
  console.log('checkAuth ' + req.url);

  // don't serve /secure to those not logged in
  // you should add to this list, for each and every secure url
  if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }

  next();
}

app.use(express.cookieParser());
app.use(express.session({ secret: 'example' }));
app.use(express.bodyParser());
app.use(checkAuth);

require('./lib/routes.js')(app);

app.listen(port, () => {
  console.log('Node listening on port %s', port);
});
