const User = require("../models/user");
const bcrypt = require("bcryptjs");

//register
const register = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",

      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login=async(req,res)=>{
    try{
const user=await User.findOne({username:req.body.username})
!user  && res.status(400).json("Wrong credentials !")
const validated=await bcrypt.compare(req.body.password,user.password)
!validated && res.status(400).json("Wrong credentials !")
const {password,...others}=user._doc
res.status(200).json(others)
    }catch(err){
        res.status(500).json({
            error:err.message,
        });
    }
}


module.exports = {
  register,
  login,
};
