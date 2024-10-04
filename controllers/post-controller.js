
const Post =require("../models/post")

//create
const createPost=async(req,res)=>{
    const newPost=new Post(req.body)
    try{
const createdPost=await newPost.save()
res.status(201).json(createdPost)

    }catch(err){
        res.status(500).json(err.message)
    }
}


//update post
const updatePost=async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        if(post.username===req.body.username)
        {
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost)

            }catch(err){
                res.status(500).json(err.message)
            }
        }else{
            res.status(401).json("Unauthorized access")
        }


    }catch(err){
        res.status(500).json(err.message)
    }
}


//deletePost

const deletePost=async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        if(post.username===req.body.username)
        {
            try{
               await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("post has been deleted successfully")

            }catch(err){
                res.status(500).json(err.message)
            }
        }else{
            res.status(401).json("Unauthorized access")
        }


    }catch(err){
        res.status(500).json(err.message)
    }

  
}

  //get post
  const getSinglePost=async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err.message)
    }
}

//get all post
const getAllPost=async(req,res)=>{
    const username=req.query.user
    const catName=req.query.cat
    try{
        let posts
        if(username){
            posts=await Post.find({username})
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts=await Post.find({})
        }
        

            res.status(200).json(posts)
        
    }catch(err){
        res.status(500).json(err.message)
    }
}


module.exports={
    createPost,
    updatePost,
    deletePost,
    getSinglePost,
    getAllPost
}