const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'YashisaLemonBoy';

router.post(
  "/",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exisits" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
       return res.status(400).json({error: "Please login with correct credentials"});
      }

     const passwordCompare = await bcrypt.compare(password, user.password);
     
     if(!passwordCompare) {
      return res.status(400).json({error: "Please login with correct crredentials"});
     }

      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_SECRET);
      res.json({authtoken: jwtData});
    } catch (error) {
      res.status(500).send("Some error occured regarding login");
      console.log(error.message);
    }
  }
);

router.post("/getuser",fetchuser, async (req,res) => {
     try {
       const userID = req.user.id;
       const user = await User.findById(userID).select("-password");
       res.send(user);
     }
     catch(error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
     }

})

module.exports = router;
