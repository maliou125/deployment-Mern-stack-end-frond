const express = require("express")
const router = express.Router()
const {check}= require("express-validator")
const {register,login,getUserData,getProduct,createOrder,getUserOrders}= require("../controllers/userController")

const authMiddleware= require("../middleware/authMiddleware")
router.post("/register",[check('email','email is not valid').isEmail().normalizeEmail(),
check("password","your password must at least 8 characters, one number, one symbol").isStrongPassword({
    minLength:8,minSymbols:1,minLowercase:1,minUppercase:1,minNumbers:1
})],register)
router.post("/login", login)
router.get("/",authMiddleware, getUserData)
router.get("/getproduct",getProduct)
router.post("/createorder",authMiddleware,createOrder)
router.get("/getuserorders",authMiddleware,getUserOrders)




module.exports=router