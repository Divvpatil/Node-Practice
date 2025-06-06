const express = require('express');
const router = express.Router();

const Person = require('../models/Person.js')

router.post('/',async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
})


router.get('/',async (req,res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


router.get('/:workType',async (req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType=='chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work : workType});
            console.log("data fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({Error: "Invalid Work Type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.put('/:id', async (req,res) =>{
    try {
        const personId = req.params.id;
        const updatedPerson = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPerson,{
            new: true,
            runValidators : true
        });

        if(!response){
            return res.status(404).json({Error: "Person not Found"})
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({Error: "Internal server error"})
    }
})

router.delete('/:id', async (req,res) =>{
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({Error: "Person not Found"})
        }
        console.log('data deleted');
        res.status(200).json({Message : "Data deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: "Internal server error"});
    }
})

module.exports = router;
