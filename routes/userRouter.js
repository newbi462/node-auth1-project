const express = require('express');
const bcryptjs = require("bcryptjs");

const UserModel = require('./userModel.js');

const router = express.Router();


router.post('/dumy', (request, responce) => {
  db("cars").insert(request.body)
    .then(idOfAdded => {
      db("cars").where({id:idOfAdded[0]})
      .then(acc => { responce.json(acc); })
      .catch( error => {
        console.log(error);
        responce.status(500).json( {error: "Where by ID Failed."} )
      })
    })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Post Failed."} )
    })
});

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

module.exports = router;
