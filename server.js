const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000; 
app.use(bodyParser.json());

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'plants',
  password: 'system',
  port: 5432,
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.get('/api/plants', (req, res) => {
    pool.query('SELECT * FROM plants',  (error, result) => {
    
        if (error){
            throw error
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(result.rows)
        }
    })
    
});