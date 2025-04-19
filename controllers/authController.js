const jwt = require("jsonwebtoken");
const { signupSchema } = require("../middleware/validator");
const { doHash } = require("../utils/hashing");

exports.signup = async (req,res) => {
   const {email,password} = req.body;
   try{
      const {error, value} = signupSchema.validate({email,password});
      if(error){
          return res.status(401).json({success: false, message: error.details[0].message});
      }
      const existingUser = await User.findOne({email});
      if (existingUser){
          return res.status(401).json({success: false, message: "User already exists"});
      }
      const hashedPassword = await doHash(password, 12);

      const newUser = new User({
          email,
          password: hashedPassword,
      })
      const result = await newUser.save();
      result.password = undefined;
      res.status(201).json({success: true, message: "User created successfully", result,});
   }
   catch(err){
       console.log(err);
   }
};

exports.signin = async (req,res) => {
    const {email,password} = req.body;
    try{
        const {error, value} = signinSchema.validate({email,password});
        if(error){
            return res.status(401).json({success: false, message: error.details[0].message});
        }    
        const existingUser = await User.findOne({email}).select("+password");
        if(!existingUser){
            return res.status(401).json({success: false, message: "User does not exist"});
        }
        const result = await doHashValidation(password, existingUser.password);
        if(!result){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified,
        },process.env.TOKEN_SECRET);
        res.cookie('Authorization','Bearer ' + token,{expires:new Date(Date.now()+ 8 * 3600000),httpOnly: process.env.NODE_ENV === 'production',secure: process.env.NODE_ENV === 'production'})
        .json({success: true, message: "User signed in successfully", token,});
    }
    catch(err){
        console.log(err);
    }
};
