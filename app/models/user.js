const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const bcryptjs=require('bcryptjs')
const Schema=mongoose.Schema


const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'username is required']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


userSchema.pre('save',function(next){
    const user=this
    console.log(user)
    bcryptjs.genSalt()
            .then((salt)=>{
               bcryptjs.hash(user.password,salt)
                        .then((encryptedpassword)=>{
                            user.password=encryptedpassword
                            console.log(user.password)
                            next()
                        })
            })
            .catch((err)=>{
                res.json(err)
            })
})


const User=mongoose.model('User',userSchema)

module.exports=User