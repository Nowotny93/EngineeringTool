const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const poController = require('./controllers/poController');

start()

async function start() {

    await new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/acqeTool')
      const db = mongoose.connection;
      db.once('open', () => {

          console.log('Database connected');
          resolve()
      })
      db.on('error', (err) => reject(err));
    })


    const app = express()

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true,
      })
    );

    app.use('/', poController)

    app.get('/', (req, res) => res.send('It works!'));
    app.listen(5000, () => console.log('REST Service is running on port 5000'))
}