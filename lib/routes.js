const util = require('util');
const auth = require('basic-auth');

module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.send('index');
  });

  app.get('/welcome', function (req, res, next) {
    res.send('welcome');
  });

  app.get('/secure', function (req, res, next) {
    res.send('secure');
  });

  app.post('/login', function (req, res) {
    const credentials = auth(req);
    // let credentials = req.body;
    // console.log(credentials);
    // console.log(credentials.pass);
    if (!credentials || credentials.login !== 'john' || credentials.pass !== 'secret') {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')
    } else {
      res.send('Access granted')
    }
  });


  // app.post('/login', function (req, res, next) {
  //
  //   // you might like to do a database look-up or something more scalable here
  //   if (req.body.username && req.body.username === 'user'){// && req.body.password && req.body.password === 'pass') {
  //     req.session.authenticated = true;
  //     res.redirect('/secure');
  //   } else {
  //     req.flash('error', 'Username and password are incorrect');
  //     res.redirect('/login');
  //   }
  //
  // });

  app.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
  });

};
