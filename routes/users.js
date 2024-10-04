const { updateUser,deleteUser, getSingleUser, contact } = require('../controllers/user-controller')

const router=require('express').Router()

//register
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/:id",getSingleUser)

module.exports=router