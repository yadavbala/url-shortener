const Url=require('../models/url')

const urlsCltr={}

urlsCltr.list=(req,res)=>{
    Url.find()
        .then((urls)=>{
            res.json(urls)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.create=(req,res)=>{
    const body=req.body
    console.log('body',body)
    const url=new Url(body)
    console.log('url',url)
    url.userId=req.userId
    url.save()
        .then((url)=>{
            console.log('result',url)
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })

}

urlsCltr.show=(req,res)=>{
    const id=req.params.id
    Url.findOne({_id:id,userId:req.userId})
        .then((url)=>{
            if(url){
                res.json(url)
            }
            else{
                res.json({error:'url not found'})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.update=(req,res)=>{
    const body=req.body
    const id=req.params.id
    Url.findOneAndUpdate({_id:id,userId:req.userId},body,{new:true,runValidators:true})
        .then((url)=>{
            if(url){
                res.json(url)
            }
            else{
                res.json({error:'url not found'})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.destroy=(req,res)=>{
    const id=req.params.id
    Url.findOneAndDelete({_id:id,userId:req.userId})
        .then((url)=>{
            if(url){
                res.json(url)
            }
            else{
                res.json({error:'url not found'})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.showHash=(req,res)=>{
    const id=req.params.hash
    console.log(id)
    Url.findOne({hashedUrl:id})
        .then((url)=>{
           if(url){  
            if(req.useragent.isMobile){
                body={clickDateTime:new Date(),ipAddress:req.ip,browser:req.useragent.browser,platform:req.useragent.platform,device:'mobile'}
             }
             else if(req.useragent.isDesktop){
                  body={clickDateTime:new Date(),ipAddress:req.ip,browser:req.useragent.browser,platform:req.useragent.platform,device:'desktop'}
             }
             Url.findOneAndUpdate(
                 {_id:url._id},
                 {$push:{clicks:body}},
                 {new:true},
                function(err,doc){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(doc)
                    }
                }
             )
             res.redirect(url.originalUrl)
           }
           else{
            res.json({error:'url not found'})
           }
        })
        .catch((err)=>{
            res.json(err)
        })
}
module.exports=urlsCltr

