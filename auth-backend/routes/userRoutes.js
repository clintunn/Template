const router = require('express').Router();
const User = require('../models/User');

// creating user
router.post('/signup', async(req, res)=> {// This is for creating a new user using post
  try {
    const {name, email, password} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, password});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
    msg = "User already exists"
    } else {
    msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
}
})

// login user

router.post('/login', async(req, res)=> {
try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    res.status(200).json(user);
} catch (e) {
    res.status(400).json(e.message)
}
})


module.exports = router