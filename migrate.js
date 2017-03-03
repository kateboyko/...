const knex = require('knex')({
  client: 'mysql',
  connection: {
    host        : 'localhost',
    user        : 'test',
    password    : 'root',
    database    : 'yet_another_test',
    charset  : 'utf8'
  }
});

const Schema = require('./schema');
const sequence = require('when/sequence');
const _ = require('lodash');
function createTable(tableName) {
  return knex.schema.createTable(tableName, function (table) {
    let column;
    let columnKeys = _.keys(Schema[tableName]);
    _.each(columnKeys, function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      }
      else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      }
      else {
        column = table[Schema[tableName][key].type](key);
      }
      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }
      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }
      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}
function createTables () {
  let tables = [];
  let tableNames = _.keys(Schema);
  tables = _.map(tableNames, function (tableName) {
    return function () {
      return createTable(tableName);
    };
  });
  return sequence(tables);
}
createTables()
  .then(function() {
    console.log('Tables created!!');
    process.exit(0);
  })
  .catch(function (error) {
    throw error;
  });

// function checkAuth (req, res, next) {
//   console.log('checkAuth ' + req.url);
//
//   // don't serve /secure to those not logged in
//   // you should add to this list, for each and every secure url
//   if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
//     res.render('unauthorised', { status: 403 });
//     return;
//   }
//
//   next();
// }
//
// app.configure(function () {
//
//   app.use(express.cookieParser());
//   app.use(express.session({ secret: 'example' }));
//   app.use(express.bodyParser());
//   app.use(checkAuth);
//   app.use(app.router);
//   app.set('view engine', 'jade');
//   app.set('view options', { layout: false });
//
// });
//
// require('./lib/routes.js')(app);
//
// app.listen(port);
// console.log('Node listening on port %s', port);



// const http = require('http')
// const express = require('express');
// const bodyParser = require('body-parser');
//
// const port = 3000;
//
// const app = express.createServer();
// // Create server
// app.get('/login', function (req, res) {
//   const credentials = req.query;
//
//   if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
//     res.statusCode = 401;
//     res.setHeader('WWW-Authenticate', 'Basic realm="example"')
//     res.end('Access denied')
//   } else {
//     res.end('Access granted')
//   }
// });
//
// // Listen
// app.listen(port, () => {
//   console.log("Server is listening on port " + port);
// });



