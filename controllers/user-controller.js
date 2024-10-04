const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//update
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

//delete
const deleteUser=async(req,res)=>{
    if(req.body.userId===req.params.id){
        const user=await User.findById(req.params.id)
        if(user){
            try{
await Post.deleteMany({username:user.username})
await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User deleted successfully")
            }catch(err){
                res.status(500).json({message:"Server error"})
            }

        }else{
            return res.status(404).json("User not found")
        }
  }else{
        res.status(500).json("You can delete only your account")
    }
}

//get single user
const getSingleUser=async(req,res)=>{
  try{
    const user=await User.findById(req.params.id)
    const {password,...others}=user._doc
    res.status(200).json(others)

  }catch(err){
    res.status(500).json(err.message)
  }
}

//contact
  const contact=async(req,res)=>{
    try{
      res.status(200).json("Contact form submitted successfully")
    }catch(err){
      res.status(500).json({message:"Server error"})
    }
  }
 

module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,

};
