require('dotenv').config(); 
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.use((req,res,next) =>{
  if(req.method == 'GET'){
    res.redirect('https://www.google.com/');
  }else{
    next()
  }
})

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
app.get('/add', (req,res) =>{
  console.log('requested add')
  res.sendFile(path.join(__dirname,'add.html'));
})
app.get('/items', (req, res) => {
  console.log('Sending....')
    const query = 'SELECT * FROM spendings ORDER BY Date DESC';
    connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });


app.post('/add-data', (req, res) => {
  console.log(req.body.date);
  const { date, category, amount, currency, description, recurring } = req.body
  //TODO add form validation.
  const query = `INSERT INTO spendings (Date, Category, Amount, Currency, Description, Recurring) VALUES (?, ?, ?, ?, ?, ?) `
  connection.query(query,[new Date(date), category, parseFloat(amount), currency.toUpperCase(), description, recurring], (err, result) =>{
    if(err){
      console.log(err);
      res.status(500).send('Failed to insert data')
    }else{
      console.log('Insertion successful', result);
      res.json({ message: 'Data received successfully' });
    }
  })
});

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