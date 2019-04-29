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

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
   connection.query(
     "SELECT * FROM customer WHERE isDeleted = 0",
     (err, rows, fields) => {
       res.send(rows);
     }
   )
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res)=>{
  let sql = 'INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, now(), 0)';

  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let sex = req.body.sex;
  let job = req.body.job;

  let params = [image, name, birthday, sex, job];

  connection.query(sql, params, 
    (err,rows, fields) => {
      res.send(rows);
    })
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];

  connection.query (sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));