/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt")
const User = require("../models/User")

// ========Register a New User============
const registerUser = async (req, res) => {

    try {  
        // generate hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });

        !newUser && res.status(400).send({ success: false, error: "Something went wrong!" });

        await newUser.save();
        res.status(200).send({ success: true, message: `Register successfully`, user: newUser });
    } 
    catch (error) {
        return res.status(500).send(error);
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
        !valiPassword && res.status(400).send({ success: false, error: "wrong password!" });
        
        res.status(200).send({ success: true, message: "login success", username: user.username });
    }
    catch (error) {
       return res.status(500).send(error);
    }   
};

// ========Get User info============
const singleUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...others} = user._doc
         res.status(200).send({ success: true, message: `user found successfully`, data: others})
     } catch(error){
         return res.status(500).send(error)
     }
}

module.exports= {registerUser, loginUser, singleUser}