var pg = require('pg');
const config = require('../config');

var client = new pg.Client(config.db);
client.connect();

module.exports = {
    addNewUsers: function (values) {
        console.log("Query AddNewUsers");      
        client.query('INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME, USER_NAME) VALUES($1, $2, $3, $4)', values, (err, result) => {
          if (err) {
            return console.error('error running query', err);
          }
        });
    },
    addNewWebsite:  function (values) {
        console.log("Query addNewWebsite"); 
        client.query('INSERT INTO PASSWORD_HOLDERS(ID, WEBSITE_NAME, USER_NAME, PASSWORD) VALUES($1, $2, $3, $4)', values, (err, result) => {
          if (err) { 
            return console.error('error running query', err);
          }
        });
      },
    userExist: function (values) {
        return new Promise((resolve, reject) => {
          client.query('SELECT * FROM USERS WHERE id=$1', values, (err, result) =>{
            if (err) {
              return console.error('error running query', err);
            }
            resolve(result.rowCount);
          });
        });
    },
    fetchCurrentUser: function (values, cb) {
        client.query('SELECT WEBSITE_NAME,USER_NAME,PASSWORD FROM PASSWORD_HOLDERS s WHERE s.id=$1', values, (err, result) => {
          if (err) {
            return console.error('error running query', err);
          }
          cb.json(result.rows);
        });
    }
}

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