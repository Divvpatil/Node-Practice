const express = require('express')
const app = express()
const db = require('./db.js')
require('dotenv').config();
const passport = require('./auth.js');


const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();  // always use next function or the code will stuck in middleware only
}

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local' , {session : false});

app.use(logRequest);
app.get('/' ,(req, res) => {
  res.send('Hello There! Welcome to the Hotel')
})

const menuRouter = require('./routes/menuRoutes.js');
const personRoutes = require('./routes/personRoutes.js')

app.use('/menuitem', menuRouter);
app.use('/person',localAuthMiddleware, personRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log("Listening on port 3000")
})