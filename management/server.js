const fs = require('fs'); // library that can aceess the file
const mysql = require('mysql'); // call mysql library
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json'); //read file
const conf = JSON.parse(data); //data parsing

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get('/api/customers', (req, res) => {
   connection.query(
     "SELECT * FROM customer",
     (err, rows, fields) => {
       res.send(rows);
     }
   )
});

app.listen(port, () => console.log(`Listening on port ${port}`));