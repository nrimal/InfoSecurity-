const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const db = require('./queries');
const civic = require('./civic');
const sqlinjection = require('sql-injection');
const Cryptr = require('cryptr');

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//app.use(sqlinjection);
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))



app.post('/api/addnewvalues', (req, res) => {
  var values = [];
  var cryptr = new Cryptr(req.body.userId);
  values.push(req.body.userId);
  values.push(req.body.website_name);
  values.push(req.body.user_name);
  values.push(cryptr.encrypt(req.body.password));
  db.addNewWebsite(values, res);
});

app.get('/api/sendAuth/:jwt', (req, res) => {
  civic.exchangeCode(req.params.jwt).then(userId => {
    db.userExist([userId]).then(result => {
      if (!result) {
        db.addNewUsers([userId, '', '', '']);
      }
      res.json(userId);
    });
  });
});

app.get('/api/users/:userId', (req, res) => {
  var values = [req.params.userId];
  db.fetchCurrentUser(values, res);
});

app.delete('/api/delete/website', (req, res) => {
  var values = [req.body.userId, req.body.website_name];
  db.deleteWebsite(values, res);
});

app.delete('/api/delete/user', (req, res) => {
  var values = [req.body.userId];
  db.deleteUser(values, res);
});

app.get('/api/user', (req, res) => {
  db.getUser(res);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));