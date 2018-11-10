const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var pg = require('pg');
const conString = "postgres://vzqhvtnq:YVJl85B7GskzuRJjZY7Scbty9LAXhZ7R@pellefant.db.elephantsql.com:5432/vzqhvtnq";

var client = new pg.Client(conString);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

client.connect();

/*
CREATE TABLE PASSWORD_HOLDERS (
ID VARCHAR(255),
WEBSITE_NAME VARCHAR(255),
USER_NAME VARCHAR(255),
PASSWORD VARCHAR(255),
CONSTRAINT unique_key PRIMARY KEY(USER_NAME,PASSWORD,WEBSITE_NAME)
);
/////////////////
CREATE TABLE USERS (
ID VARCHAR(255) PRIMARY KEY,
FIRST_NAME VARCHAR(255),
LAST_NAME VARCHAR(255),
USER_NAME VARCHAR(255)
);
*/


/*
Query for adding new users to DB
*/
var addNewUsers = function (values) {
  console.log("test123");
  
  client.query('INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME, USER_NAME) VALUES($1, $2, $3, $4)', values, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
  });
};

/*
Query for adding new website password to db
*/
var addNewWebsite = function (values) {
  console.log("test"); 
  client.query('INSERT INTO PASSWORD_HOLDERS(ID, WEBSITE_NAME, USER_NAME, PASSWORD) VALUES($1, $2, $3, $4)', values, (err, result) => {
    if (err) { //could be constrain is being violated
      return console.error('error running query', err);
    }
  });
};

var fetchCurrentUser = function (values, cb) {
  client.query('SELECT WEBSITE_NAME,USER_NAME,PASSWORD FROM PASSWORD_HOLDERS s WHERE s.id=$1', values, (err, result) => {
    if (err) {
      // cb.send("error");
      return console.error('error running query', err);
    }
    cb.json(result.rows);
  });
};

/*
Post call to post data of new users to db
Need to make sure req body matches the object/values needed to add to db
Would need to fetch from stuff from civic 
*/
app.post('/api/addnewvalues', (req, res) => {
  var values = [];
  values.push(req.body.userId);
  values.push(req.body.website_name);
  values.push(req.body.user_name);
  values.push(req.body.password);
  addNewWebsite(values);
});

app.get('/api/users/:userId', (req, res) => {
  console.log("test");
  var values = [req.params.userId];
  fetchCurrentUser(values, res);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);