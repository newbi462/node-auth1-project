const express = require('express');
const bcryptjs = require("bcryptjs");

const UserModel = require('./userModel.js');

const router = express.Router();


router.post("/register", (request, responce) => {
  let userObj = request.body;
  const hash = bcryptjs.hashSync(request.body.password, 8);// 2^8 hash
  userObj.password = hash;// based on what I called this in my table object

  UserModel.addUser(userObj)
    .then(saved => {
      responce.status(201).json(saved);
    })
    .catch(error => {
      responce.status(500).json(error);
    });
});


router.post("/login", (request, responce) => {
  let { user, password } = request.body;

  UserModel.findByProp({ user }).first()//first() assumes user is the first find
    .then(userObj => {
      if (userObj && bcryptjs.compareSync(password, userObj.password)) {
        // if (user) {
        // compare().then(match => {
        //   if (match) {
        //     // good password
        //   } else {
        //     // they don't match
        //   }
        // }).catch()
        responce.status(200).json({ message: `Welcome ${userObj.user}!, you are Logged In` });
      } else {
        responce.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      responce.status(500).json(error);
    });
});

module.exports = router;
