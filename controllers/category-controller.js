const Category=require("../models/category")

//create category
const createCat=async(req,res)=>{
    const newCat=new Category(req.body)
    try{
        const savedCat=await newCat.save()
        res.status(201).json(savedCat)
    }catch(err){
        res.status(500).json(err.message)
    }
}

//get category
const getAllCats=async(req,res)=>{
    try{
        const cats=await Category.find()
        res.status(200).json(cats)
    }catch(err){
        res.status(500).json(err.message)
    }
}
module.exports={
    createCat,
    getAllCats
 
}