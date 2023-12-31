const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Create a user using : POST "/api/auth"  Doesnt require auth

router.post('/',[
   body('email', "Enter a valid email").isEmail(),
   body('name', "Enter a valid email").isLength({min : 3}),
   body('password', "Password must be atlease 5 characters").isLength({min : 5}),

], (req, res)=>{
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }
  User.create({
   name: req.body.name,
   email: req.body.email,
   password:req.body.password,
  }).then(user=>res.json(user))
  .catch(err=>{console.log(err)
  res.json({error : 'PLease enter a unique value for email', message: err.message})})
})

module.exports = router