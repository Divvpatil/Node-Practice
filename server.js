const express = require('express')
const app = express()
const db = require('./db.js')

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello There! Welcome to the Hotel')
})

const menuRouter = require('./routes/menuRoutes.js');
const personRoutes = require('./routes/personRoutes.js')

app.use('/menuitem', menuRouter);
app.use('/person', personRoutes);

app.listen(3000,() =>{
    console.log("Listening on port 3000")
})