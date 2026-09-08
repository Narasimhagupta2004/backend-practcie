const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
    destination : "uploads/",
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
const upload = multer({storage});
router.post('/register', upload.single("profilephoto"),  async(req,res) => {

    try{
        const {email , password,} = req.body;
        if(!email || !password) {
            return res.status(404).json({ msg : "email or password not found"});
        }
        console.log(email);
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({msg : "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
                email : email,
                password : hashPassword
        });
        console.log("user created successfully");
        res.status(201).json({msg : "User created successfully"});
    }catch(err){
        res.status(500).json({
            msg : 'Server error'
        })
    }

})


router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        console.log(email,password)
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({msg : `user does not exists`});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword){
            return res.status(401).json({msg : `invalid  mail or password`});
        }
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_Secrete,
            {expiresIn : "1h"}
        );
        res.json({
            msg : "Login successful"
        })
    }catch(err){
        res.status(500).json( { msg : " server error"});
    }
})

module.exports = router;