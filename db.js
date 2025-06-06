const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

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