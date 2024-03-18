require('dotenv').config(); 
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname,'public/')));
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
}
)
connection.connect(() => console.log('connected to the database'));
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/items', (req, res) => {
  console.log('Sending....')
    const query = 'SELECT * FROM spendings';
    connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
app.post('')

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully.');
    connection.end(err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Closed database connection.');
      }
      process.exit(err ? 1 : 0);
    });
  });