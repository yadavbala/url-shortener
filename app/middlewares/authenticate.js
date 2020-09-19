const jwt=require('jsonwebtoken')
const { SECRET } = require('../../utils/configure-env')

const authenticate=(req,res,next)=>{
    const authToken=req.headers.authorization
    console.log(authToken)
    if(authToken){
        let tokenData
        try{
            tokenData=jwt.verify(authToken,SECRET)
            console.log(tokenData)
            req.userId=tokenData.id
            next()
        }
        catch(e){
            res.status(401).json({error:e.message})
        }
    }
    else{
        res.json({error:'token not provided'})
    }
}

module.exports={authenticate}