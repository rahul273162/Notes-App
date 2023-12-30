const express = require("express");
const {Notemodel} = require("../models/Note.model");

const noteRouter = express.Router();

noteRouter.get("/", async(req, res) => {
    try {
        const note = await Notemodel.find()
        res.send(note);
    } catch (err) {
        console.log(err);
    }
});

noteRouter.post("/create", async(req, res) => {
    const payload = req.body;
    try {
        const new_note = new Notemodel(payload);
        await new_note.save();
        res.send("Note Created")
    } catch (err) {
        console.log(err);
        res.send({"msg":"404 Something Went wrong"})
    }
})

noteRouter.patch("/update/:id", async(req, res) => {
    const payload = req.body;
    const ID = req.params.id;
    const note = await Notemodel.findOne({"_id":ID})
    const userId_in_note = note.userID;
    const userId_making_request = req.body.userID;
    try {
        if(userId_making_request !== userId_in_note) {
            res.send({"msg": "You Are Not Authorized"})
        }
        else {
            await Notemodel.findByIdAndUpdate({"_id": ID}, payload);
            res.send("Note Updated")
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"404 Something Went Wrong"});
    }
});

noteRouter.delete("/delete/:id", async(req, res) => {
    const ID = req.params.id;
    const note = await Notemodel.findOne({"_id":ID})
    const userId_in_note = note.userID;
    const userId_making_request = req.body.userID;
    try {
        if(userId_making_request !== userId_in_note) {
            res.send({"msg": "You Are Not Authorized"})
        }
        else {
            await Notemodel.findByIdAndDelete({"_id": ID});
            res.send("Note Deleted")
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"404 Something Went Wrong"});
    }
})



module.exports = {
    noteRouter
};