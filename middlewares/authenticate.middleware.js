const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const decoded_token = jwt.verify(token, "masai")
        if(decoded_token) {
            const userID = decoded_token.userID;
            req.body.userID = userID;
            next();
        }
        else {
            res.send("Please Login First")
        }
    }
    else {
        res.send("Please Login First")
    }
}


module.exports = {
    authenticate
};