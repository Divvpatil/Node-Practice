const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem.js')

router.post('/',async (req,res) =>{
    try {
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();

        console.log("New item saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
})


router.get('/',async (req,res) =>{
    try {
        const data = await MenuItem.find();
        console.log('Menu fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/:itaste', async (req,res) =>{
    try {
        const taste = req.params.itaste;
        if(taste == 'Sweet' || taste == 'Sour' || taste == 'Spicy'){
            const data = await MenuItem.find({taste : taste});
            console.log('Menu fetched');
            res.status(200).json(data);
        }else{
            res.status(404).json({Error : "Invalid Option"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router;