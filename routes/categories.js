const {createCat,getAllCats} =require("../controllers/category-controller")
const router=require('express').Router()

//register
router.post("/",createCat)


router.get("/",getAllCats)

module.exports=router