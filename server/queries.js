var pg = require('pg');
const config = require('../config');
const Cryptr = require('cryptr');
const bcrypt = require('bcrypt');

var client = new pg.Client(config.db);
client.connect();
const saltRounds = 1;

module.exports = {
    addNewUsers: function (values) {
        console.log("Query AddNewUsers");  
          client.query('INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME, USER_NAME) VALUES($1, $2, $3, $4)', values, (err, result) => {
            if (err) {
              return console.error('error running query', err);
            }
        });
    },
    addNewWebsite:  function (values, cb) {
        console.log("Query addNewWebsite"); 
        client.query('INSERT INTO PASSWORD_HOLDERS(ID, WEBSITE_NAME, USER_NAME, PASSWORD) VALUES($1, $2, $3, $4)', values, (err, result) => {
          if (err) { 
            return console.error('error running query', err);
          }
        });
        cb.send(200);
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
        let cryptr = new Cryptr(values[0]);
        client.query('SELECT WEBSITE_NAME,USER_NAME,PASSWORD FROM PASSWORD_HOLDERS s WHERE s.id=$1', values, (err, result) => {
          if (err) {
            return console.error('error running query', err);
          }
          result.rows.forEach(entry => {
            entry.password = cryptr.decrypt(entry.password);
          });
          cb.json(result.rows);
        });
    },
    deleteWebsite: function (values, cb) {
      client.query('DELETE FROM PASSWORD_HOLDERS s WHERE s.id=$1 AND s.website_name=$2', values, (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        cb.json(result.rows);
      });
    },
    deleteUser: function (values, cb) {
      client.query('DELETE FROM USERS u WHERE u.id=$1', values, (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        cb.json(result.rows);
      });
    },
    getUsers: function (cb) {
      client.query('SELECT * FROM USERS', [], (err, result) => {
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