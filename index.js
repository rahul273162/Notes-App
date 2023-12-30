const express = require("express");
const {connection} = require("./db");
const cors = require("cors");
const {userRouter} = require("./routes/User.route");
const {noteRouter} = require("./routes/Note.router");
const {authenticate} = require("./middlewares/authenticate.middleware");
require('dotenv').config();

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",noteRouter);



app.listen(process.env.port, async() => {
    try {
       await connection
       console.log("Connected to DB"); 
    } catch (err) {
        console.log(err);
        console.log("Can't Connect to DB"); 
    }
    console.log(`Server is running on port ${process.env.port}`);
})