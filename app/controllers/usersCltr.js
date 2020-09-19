const User=require('../models/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {SECRET}=require('../../utils/configure-env')
const usersCltr={}

usersCltr.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}


usersCltr.login=(req,res)=>{
const body=req.body
User.findOne({email:body.email})
    .then((user)=>{
        if(user){
            bcryptjs.compare(body.password,user.password)
                    .then((result)=>{
                        if(result){
                            const obj={id:user._id}
                            const tokenData=jwt.sign(obj,SECRET,{expiresIn:'1d'})
                            res.json({token:tokenData})
                        }else{
                            res.json({error:'email/password not found'})
                        }
                    })
        }
        else{
            res.json({error:'email/password not found'})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

usersCltr.account=(req,res)=>{
    User.findById(req.userId)
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports=usersCltr