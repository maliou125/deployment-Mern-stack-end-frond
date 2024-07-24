const jwt = require("jsonwebtoken")


const authMiddleware = async(req,res,next)=>{
    try{
        const token= req.headers.token
        if(!token) res.status(401).json({msg:"you are not authorized"})

        else{
            const verifytoken = await jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(!verifytoken) res.status(401).json({msg:"you are not authorized"})
                else{
            req.body.userId= verifytoken.id
            next()
        }
        }
    }
    catch(err){
        res.status(500).json({msg:"something went wrong!", err:err.message})
    }


}
module.exports= authMiddleware