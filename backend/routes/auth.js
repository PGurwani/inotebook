const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Create a user using : POST "/api/auth/createuser"  No login required

router.post('/createuser',[
   body('email', "Enter a valid email").isEmail(),
   body('name', "Enter a valid email").isLength({min : 3}),
   body('password', "Password must be atlease 5 characters").isLength({min : 5}),

], async (req, res)=>{
  //If there are errors retunr bad request and the errors
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }
  //Check whether user with same email already exists
  try{

  
  let user = await User.findOne({email:req.body.email});
  if(user)
  {
    return res.status(400).json({error:"Sorry a user with this emailalready exists"})
  }

   user = await User.create
   ({
   name: req.body.name,
   email: req.body.email,
   password:req.body.password,
  })
  
  // .then(user=>res.json(user))
  // .catch(err=>{console.log(err)
  // res.json({error : 'PLease enter a unique value for email', message: err.message})})
  res.json(user);
  } catch(error)
  {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})

module.exports = router