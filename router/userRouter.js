const express = require('express')
const mongoose = require('mongoose')
const Userschema = require("../schema/userSchema")
const { ObjectId } = require('mongodb')
const User =new  mongoose.model("UserInformation",Userschema)
const router = express.Router()



router.post('/', async (req, res) => {
    try {
      const userInformation = User(req.body); // Assuming User is a model
      const newUser = await userInformation.save();
      res.status(201).json({ user:newUser });
    } catch (error) {
      res.status(500).json({ error: error.message }); // Provide a more detailed error message
    }
  });

  router.get('/',async(req,res)=>{
    const search = req.query.search;
    //console.log(search);
    const query = {username:{$regex:search, $options: 'i'}}
    try{
const userInformation = await User.find({})
res.status(200).json(userInformation);
    }
    catch(error){
        res.status(500).json({ error: error.message }); // Provide a more detailed error message
    }
  })




// router.get('/', async (req, res) => {
//     try {
//         const search = req.query.search;
//         console.log(search);

//         // Basic input validation
//         if (!search) {
//             return res.status(400).json({ error: 'Search query is required.' });
//         }

//         // Sanitize user input (you may want to use a library for this)
//         const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//         const query = { username: { $regex: sanitizedSearch, $options: 'i' } };

//         const userInformation = await User.find(query);
//         res.status(200).json(userInformation);
//     } catch (error) {
//         // Provide a more detailed error message during development
//         res.status(500).json({ error: error.message });
//     }
// });





  router.patch('/', async (req, res) => {
    try {
      const { timeStatus, timeManagment, dateStatus, id } = req.body;
      
  
      const updateDoc = {
        $set: { timeStatus: timeStatus, timeManagment: timeManagment, dateStatus: dateStatus },
      };
      const documentsId = { _id:new ObjectId(id) };
      const result = await User.updateOne(documentsId, updateDoc);
  
      console.log(result)
  
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Document updated successfully' });
      } 
      if (result.modifiedCount === 0) {
        res.status(200).json({ message: 'thare is prbolem ' });
      } 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id; 
      const result = await User.findOne({ _id: userId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports= router