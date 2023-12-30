const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Usermodel} = require("../models/User.model");
require('dotenv').config();

const userRouter = express.Router();

userRouter.post("/register", async(req, res) => {
    const {name, gender, email, pass} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hashed_pass) => {
            if(err) {
                console.log(err);
            }
            else {
                const user = new Usermodel({name, gender, email, pass:hashed_pass});
                await user.save();
                res.send("Registered Successfully")
            }
        });
    } catch (err) {
        console.log(err);
        res.send("Something Went Wrong");
    }
})

userRouter.post("/login", async(req, res) => {
    const {email, pass} = req.body;
    try {
        const user = await Usermodel.find({email});
        const hashed_pass = user[0].pass;
        if(user.length > 0) {
            bcrypt.compare(pass, hashed_pass, (err, result) => {
                if(result) {
                    const token = jwt.sign({ userID:user[0]._id}, process.env.key);
                    res.send({"msg": "Loged In", "token": token});
                }
                else {
                    console.log(err);
                    res.send("Wrong Credentials");
                }
            });
        }
        else {
            res.send("Wrong Credentials");
        }
    } catch (error) {
        console.log(err);
        res.send("Something Went Wrong While Logging")
    }
})


module.exports = {
    userRouter
};