const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define person schema
const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true 
    },
    age: {
        type : Number
    },
    work : {
        type: String,
        enum:['chef', 'waiter', 'manager'],
        required: true
    },
    mobile : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String
    },
    salary : {
        type: Number,
        required: true
    },
    username :{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next){
    const person = this;

    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(person.password, salt);

        person.password = hashedpassword;

        next();
    } catch (error) {
        
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;