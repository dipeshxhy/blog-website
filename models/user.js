const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:'An artist at heart, expressing thoughts through writing and visuals. Follow my creative journey as I explore various art forms and share inspiration along the way.'
    },

},{timestamps:true})

module.exports=mongoose.model('User',UserSchema)