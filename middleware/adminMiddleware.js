const jwt = require("jsonwebtoken")


const adminMiddleware = async(req,res,next)=>{
    try {
        const token =req.headers.token
        if(!token){
         res.status(400).json({msg:"You are not authorized"})
        }
        else{
         const Verifytoken=await jwt.verify(token,process.env.JWT_SECRET_KEY)
         if(!Verifytoken){
             res.status(400).json({msg:"You are not authorized"})
         }
         else{
            console.log(Verifytoken)
             if(Verifytoken.role=="admin"){
                req.body.userId= Verifytoken.id
                 next()
             }
             else{
                 res.status(400).json({msg:"You are not authorized as role" })}
         }
        }
     } catch (error) {
         res.status(500).json({msg:"Sommething went Wrong /AdminAuthMiddleware/",error})
     }
 }
module.exports= {adminMiddleware}