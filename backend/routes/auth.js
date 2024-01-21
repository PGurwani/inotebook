const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Priyanshuisagoodb$oy';
//Route 1 ://Create a user using : POST "/api/auth/createuser"  No login required

router.post('/createuser', [
  body('email', "Enter a valid email").isEmail(),
  body('name', "Enter a valid email").isLength({ min: 3 }),
  body('password', "Password must be atlease 5 characters").isLength({ min: 5 }),

], async (req, res) => {
  //If there are errors retunr bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check whether user with same email already exists
  try {


    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this emailalready exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create
      ({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error : 'PLease enter a unique value for email', message: err.message})})

    // AB hum user nahi user ki jagah uski id bhejenge
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    // res.json(user)
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INternal Server Error");
  }
})
//Route 2 ://Authenticate a user using : POST "/api/auth/createuser"  No login required

router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists(),

], async (req, res) => {
  //If there are errors retunr bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "PLease try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "PLease try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Some error Occured");
  }
})

//Route 3 : Get loggin User Details using : POST "/api/auth/getuser" .Login required iise hum user ki details le sagte hai
router.post('/getuser', fetchuser , async (req, res) => {      //jab hum fetchuser middle ware ke last me next() likhenege jab jake agla wala function call honga aur agla wala function  async wala honga
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")     //minus password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router