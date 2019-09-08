

const User = require("../models/user");
const errorHandler = require("../helpers/dbErrorHandler");
// for generating token
const jwt = require("jsonwebtoken");
// for authorizing token
const expressJwt = require("express-jwt");

function signUp(req, res){
    console.log(req.body);
    const user = new User(req.body);
    console.log(user);
    user.save((error, user) => {
        if(error){
            console.log(error);
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
      
        res.json({
            user
        });
    })
}

function signIn(req, res){
    const {email, password} = req.body;
    
    User.findOne({email: email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User with the email does not exist"
            })
        }
        if(!user.authorizePassword(password)){
            return res.status(400).json({
                error: "email and password do not match"
            })
        }
        
        //generate jwt token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        console.log(token);

        // persist the token in cookie as "token" with expiry date
        res.cookie("token", token, {expire: Date.now() + 10000});
        // return response with token and user to frontend client
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
    })
}

function signOut(req, res) {
    res.clearCookie("token");
    res.json({
        message: "sign out successfully"
    })
}

const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

function isAuth(req, res, next){
    
    let user = req.userProfile && req.auth && (req.userProfile._id == req.auth._id);
    if(!user){
        return res.status(403).json({
            error: "Sorry, you are not authorized to access"
        })
    }
    next();
}

function isAdmin(req, res, next){
    if(req.userProfile.role === 0){
        return res.status(403).json({
            error: "Sorry, you are not an admin. Access denied"
        })
    }
    next();
}

module.exports = {
    signUp,
    signIn,
    signOut,
    requireSignIn,
    isAuth, 
    isAdmin
}