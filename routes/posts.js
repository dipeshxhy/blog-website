const {createPost,updatePost,deletePost,getSinglePost,getAllPost} =require("../controllers/post-controller")
const router=require('express').Router()

//register
router.post("/",createPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.get("/:id",getSinglePost)
router.get("/",getAllPost)

module.exports=router