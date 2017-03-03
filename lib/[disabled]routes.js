var util = require('util');

module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.render('index');
  });

  app.get('/',function(req,res){
    connection.query('SELECT * FROM test',function(err,rows){
      if(err) throw err;
      console.log('Data received from Db:\n');
      for(var i = 0; i < rows.length; i++)
        console.log(rows[i].name);
    });
    res.sendFile(__dirname +'/public/html/login.html');
  });

  app.get('/forgot_password',function(req,res){
    res.sendFile(__dirname +'/public/html/f_pswd.html');
  });

  app.get('/content',function(req,res){
    res.sendFile(__dirname +'/public/html/content.html');
  });

  app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/public/images/projects');
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
    form.on('end', function() {
      res.end('success');
    });
    form.parse(req);
  });

  app.post('/resetpswd', function(req, res){
    //????????? шо тут надо делать, ааа, паникаа
    res.send("Password has been changed successfully!");
  });

  app.post('/create_project', function(req, res) {
    var project = req.body;
    var query = connection.query('INSERT INTO `taaable` VALUES ?', project, function(err, result) {
      console.log('The solution is: ', result);
      if(err) console.log(err);
    });
    if(project) {
      fs.readFile('projects.json', 'utf-8', function read(err, data) {
        if (err) console.log(err);
        data = JSON.parse(data);
        data.data.projects.push(project);
        var new_data = JSON.stringify(data);
        fs.writeFile('projects.json', new_data, function (err) {
          if (err) console.log(err);
          console.log('Project added!');
        });
      });
    }
    res.end();
  });

  // app.post('/login', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: 'Invalid username or password.'
  // }), function (req, res){
  //   res.redirect('/users/' + req.user.username);
  //   // let msg = 'user not found:(';
  //   // let login = req.query.login;
  //   // let pass = req.query.pass;
  //   // connection.query('select * from users', function (err, data) {
  //   //   if(err) throw err;
  //   //   for (let i = 0; i < data.length; i++) {
  //   //     if (data[i].login == login && data[i].password == pass) {
  //   //       console.log('found!');
  //   //       msg = '';
  //   //       break;
  //   //     }
  //   //   }
  //   //   res.send(msg);
  //   // });
  // });

  app.get('/getprjlist', function(req, res){
    fs.readFile('projects.json', 'utf-8', function read(err, data) {
      if (err) console.log(err);
      data = JSON.parse(data);
      var pr_list = data.data.projects;
      var res_data = JSON.stringify(pr_list);
      res.send(res_data);
    });
  });

  app.get('/welcome', function (req, res, next) {
    res.render('welcome');
  });

  app.get('/secure', function (req, res, next) {
    res.render('secure');
  });

  app.get('/login', function (req, res, next) {
    res.render('login', { flash: req.flash() } );
  });

  app.get('/login', function (req, res, next) {
      console.log('login');
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
      req.session.authenticated = true;
      res.redirect('/secure');
    } else {
      req.flash('error', 'Username and password are incorrect');
      res.redirect('/login');
    }

  });

  app.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
  });
};
