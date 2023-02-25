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
        res.status(406).send({ status: 406, success: false, error: "email is invalid!" });
    }else if(checkEmail){
        res.status(409).send({status: 409, success: false, error: "email already used"})
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
            res.status(201).send({status: 200, success: true, message: `Register successfully`, user: newUser });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
};

// ========Login a User============
const loginUser = async (req, res) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail =  emailRegEx.test(req.body.email)
    const checkEmail = await User.findOne({email: req.body.email});
    if (!validEmail) {
        res.status(406).send({status: 406, success: false, error: "email is invalid!" });
    }else if(!checkEmail){
        res.status(204).send({status: 204, success: false, error: "create a new account"})
    }else{
    try {  
        // get user mail/username
        const user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
        !user && res.status(412).send({status: 412, success: false, error: "wrong email or uername!" });
    
        // check valid password from hash
        const valiPassword = await bcrypt.compare(req.body.password, user.password);
        if (valiPassword) {   
            // sign token and send it in response
            const token = await jwt.sign({ userId: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).send({status: 200, success: true, message: "login success", token: token });
            
        }else{
            res.status(412).send({status: 412, success: false, error: "wrong password!" });
        }
        
    }
    catch (error) {
       return res.status(500).send(error);
    } 
 }  
};

// ========Get a User============
const singleUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...others} = user._doc
         res.status(200).send({status: 200, success: true, message: `user found successfully`, data: others})
     } catch(error){
         return res.status(500).send(error)
     }
}

// ========Get all User for admin============
const allleUser = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId)
        if (user.isAdmin) {
            const users = await User.find({})
        // const {password, updatedAt, ...others} = users
         res.status(200).send({status: 200, success: true, message: `user found successfully`, data: users})
        }else{
           return res.status(403).send({success: false, message: "forbiden access", data: null})
        }
        
     } catch(error){
         return res.status(500).send(error)
     }
}

// ========Update User===========
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).send(error) 
            }
        }
        try{
            const checkUsername = await User.findOne({username: req.body.username});
            const checkEmail = await User.findOne({email: req.body.email});
            if(checkUsername){
                res.status(409).send({status: 409, success: false, error: "username already taken"}) 
            }
            else if(checkEmail){
                res.status(406).send({status: 406, success: false, error: "email already used"})
            }
            else{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).send({status: 200, success:true, message:"account has been updated"})
            }
        } catch(error){
            return res.status(500).send(error)
        }
    } else{
        return res.status(403).send({status: 403, success:false,  message: "you can update only your id"})
    }
}
// ========Delete User===========
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            // delte user posts
            await Post.deleteMany({userId: req.body.userId})
            //delte user
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send({status: 200, success:true, message:"account has been deleted successfully"})
        } catch(error){
            return res.status(500).send(error)
        }
    } else{
        return res.status(403).send({status: 403, success:false, message:"you can delete only your accout"})
    }
}


module.exports= {registerUser, loginUser}
