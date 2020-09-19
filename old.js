const mongoose=require('mongoose')
const validator=require('validator')
const sh=require('shorthash')

const Schema=mongoose.Schema

const urlSchema=new Schema({
    title:{
        type:String,
        required:[true,'title is mandatory']
    },
    originalUrl:{
        type:String,
        required:[true,'originalUrl is mandatory'],
        validate:{
            validator:function(value){
                    console.log('value',value)
                    return validator.isURL(value)
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
    clicks:[{clickDateTime:Date,ipAddress:String,browser:String,platform:String,device:String}]//shorthand for type string
})


    urlSchema.pre('save',function(next){
         const shorturl=sh.unique(this.originalUrl)
         this.hashedUrl=shorturl
         console.log('hashurl',this.hashedUrl)
        next() 
    })

 

  /*urlSchema.pre("findOneAndUpdate",async function(next){
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log(docToUpdate)
    const shorturl=sh.unique(docToUpdate.originalUrl)
        console.log('update',shorturl)
        docToUpdate.hashedUrl=shorturl
        console.log('del',docToUpdate)
      next()
  })*/

   

const Url=mongoose.model('Url',urlSchema)



module.exports=Url