const User= require("../models/userSchema")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const {validationResult} = require("express-validator")
const Product = require("../models/productSchema")
const Order = require("../models/orderSchema")

//@desc regitser role:user
//@Methode post 
//Path /register
//@access public
const register =async(req,res)=>{
    try{
        const errors= validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        
        const {name,email,password}= req.body
        const newUser = await User.findOne({email})
            if (newUser) res.status(400).json({msg:"user exist, try to connect"})
            else{
                const hashPWD= await bcrypt.hash(password, 10)
                const createUser = await User.create({email,name,password:hashPWD})
                const token = jwt.sign({id: createUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"10d"})
                res.status(201).json({msg:"user created", token:token, user:createUser})
            }
    }
    catch(err){
        res.status(500).json({msg:"something went wrong /in the registration ", err: err.message})
    }
}
//@desc login role:user
//@Methode post 
//Path /login
//@access public
const login =async(req,res)=>{
    try{
        const {email,password}= req.body
        const user = await User.findOne({email})
            if (!user) res.status(400).json({msg:"user does not exist, try to register"})
            else{
                const ckeckPWD= await bcrypt.compare(password, user.password)
                if (!ckeckPWD) res.status(400).json({msg:"wrong password , try again"})
                const token = jwt.sign({id: user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"10d"})
                res.status(201).json({msg:"login success!", token:token, user:user})
            }
    }
    catch(err){
        res.status(500).json({msg:"something went wrong /in the login ", err: err.message})
    }
}
//@desc getdata role:user
//@Methode get 
//Path /
//@access public
const getUserData= async(req,res)=>{
    try{
        const user = await User.findOne({_id: req.body.userId})
        if(!user) res.status(400).json({msg:"user does not exist tyr to register"})
        res.status(200).json({msg:"user info success", user:user})    
    }
    catch(err){
        res.status(500).json({msg:"something went wrong/in the getting info"})
    }
}
//@desc getProduct role:user
//@Methode get 
//Path /getproduct
//@access public
const getProduct= async(req,res)=>{
    try{
        const products = await Product.find()
        res.status(201).json({msg:"get all product", products:products})    
    }
    catch(err){
        res.status(500).json({msg:"something went wrong/in the fet product with user"})
    }
}

//@desc createOrder role:user
//@Methode post 
//Path /createorder
//@access public
const createOrder= async(req,res)=>{
    try{
        const {userId,productList}= req.body
        const newOrder = await Order.create({Products:productList,owner:userId})
        console.log(userId)
        res.status(201).json({msg:"send order!", newOrder})   
        console.log(newOrder) 
    }
    catch(err){
        res.status(500).json({msg:"something went wrong/in the get order"})
    }
}
//@desc getUserOrders role:user
//@Methode get 
//Path /getuserorders
//@access public
const getUserOrders= async(req,res)=>{
    try{
        const {userId}= req.body
        const userOrder = await Order.find({owner:userId})
        res.status(201).json({msg:"get all user orders", userOrder:userOrder})    
    }
    catch(err){
        res.status(500).json({msg:"something went wrong/in the fet product with user"})
    }
}

module.exports= {register,login,getUserData,getProduct,createOrder,getUserOrders}