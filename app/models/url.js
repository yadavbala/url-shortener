const mongoose=require('mongoose')
const isURL=require('validator/lib/isURL')
const sh=require('shorthash')
const Schema=mongoose.Schema

const urlSchema=new Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    originalUrl:{//custom validation//const url=new Url(body)
        //executed before pre save
        type:String,
        required:[true,'original url is required'],
        validate:{
            validator:function(value){
                console.log('value',value)
                return isURL(value)
            },
            message:function(){
                return 'invalid url format'
            }
        }
    },
    hashedUrl:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    clicks:[{clickDateTime:Date,ipAddress:String,browser:String,platform:String,device:String}]//shorthand for type string
})

urlSchema.pre('save',function(next){
    const url=this
    console.log('predoc',url)
    const shorthash=sh.unique(url.originalUrl)
    url.hashedUrl=shorthash
    console.log(url.hashedUrl)
    next()
})

/*urlSchema.pre('findOneAndUpdate',function(next){
    console.log('updateone',this._update.originalUrl)
    const shorthash=sh.unique(this._update.originalUrl)
    this._update.hashedUrl=shorthash
    next()
})*/

const Url=mongoose.model('Url',urlSchema)

module.exports=Url