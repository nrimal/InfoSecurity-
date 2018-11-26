const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const db = require('./queries');
const civic = require('./civic');

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))

/*
Post call to post data of new users to db
Need to make sure req body matches the object/values needed to add to db
Would need to fetch from stuff from civic 
*/
app.post('/api/addnewvalues', (req, res) => {
  var values = [];
  console.log(req.body);
  values.push(req.body.userId);
  values.push(req.body.website_name);
  values.push(req.body.user_name);
  values.push(req.body.password);
  db.addNewWebsite(values);
});

app.get('/api/sendAuth/:jwt', (req, res) => {
  civic.exchangeCode(req.params.jwt).then(userId => {
    db.userExist([userId]).then(result => {
      // if user exist send back user passwords
      if (!result) {
        db.addNewUsers([userId, '', '', '']);
      }
      res.json(userId);
    });
  });
});

app.get('/api/users/:userId', (req, res) => {
  console.log("/api/users/:userId");
  var values = [req.params.userId];
  db.fetchCurrentUser(values, res);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));