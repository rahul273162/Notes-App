const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    pass: String
},{
    versionKey: false
});

const Usermodel = mongoose.model("user", userSchema);


module.exports = {
    Usermodel
};