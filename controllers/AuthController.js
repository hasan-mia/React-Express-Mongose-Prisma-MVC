/* eslint-disable no-undef */
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt")
const User = require("../models/User")

// ========Register a New User============
const registerUser = async (req, res) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail =  emailRegEx.test(req.body.email)
    const checkEmail = await User.findOne({email: req.body.email});
    if (!validEmail) {
        res.status(400).send({ success: false, error: "email is invalid!" });
    }else if(checkEmail){
        res.status(409).send({success: false, error: "email already used"})
    }else{
        try {
            // generate hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            // create new user
            const newUser = await new User({
                email: req.body.email,
                password: hashPassword
            });
            await newUser.save();
            res.status(201).send({ success: true, message: `Register successfully`, user: newUser });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
};

// ========Login a User============
const loginUser = async (req, res) => {
    try {  
        // get user mail/username
        const user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
        !user && res.status(400).send({ success: false, error: "wrong email or uername!" });
    
        // check valid password from hash
        const valiPassword = await bcrypt.compare(req.body.password, user.password);
        if (valiPassword) {   
            // sign token and send it in response
            const token = await jwt.sign({ userId: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).send({ success: true, message: "login success", token: token });
            console.log(token);
            
        }else{
            res.status(400).send({ success: false, error: "wrong password!" });
        }
        
    }
    catch (error) {
       return res.status(500).send(error);
    }   
};

module.exports= {registerUser, loginUser}
