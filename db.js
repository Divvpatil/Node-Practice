const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to Database Server.");
})

db.on('error',(err)=>{
    console.log("Error in connecting Database Server.",err);
})

db.on('disconnected',()=>{
    console.log("DisConnected Database Server.");
})

module.exports = db;