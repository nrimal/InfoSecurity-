const express = require('express');
const app = express();
var pg = require('pg');


var conString = "postgres://vzqhvtnq:YVJl85B7GskzuRJjZY7Scbty9LAXhZ7R@pellefant.db.elephantsql.com:5432/vzqhvtnq";
var client = new pg.Client(conString);

// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });

app.get('/api/customers/:userId', (req, res) => {
  console.log(JSON.stringify(req.params.userId));
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);