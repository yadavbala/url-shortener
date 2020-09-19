const Url=require('../models/url')
const useragent=require('express-useragent')
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
    const url=new Url(body)
   url.save()
        .then((url)=>{
          res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.show=(req,res)=>{
    const id=req.params.id
    Url.findById(id)
        .then((url)=>{
            
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    
    Url.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        .then((url)=>{
            console.log('update')
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.destroy=(req,res)=>{
    console.log(req.params)
    const id=req.params.id
    Url.findByIdAndDelete(id)
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlsCltr.showHash=(req,res)=>{
    let body;
    const id=req.params.hash
    console.log('id',id)
    console.log('useragent',req.useragent)
    Url.findOne().where('hashedUrl').equals(id)
        .then((url)=>{
            if(req.useragent.isMobile){
               body={clickDateTime:new Date(),ipAddress:req.ip,browser:req.useragent.browser,platform:req.useragent.platform,device:'mobile'}
            }
            else if(req.useragent.isDesktop){
                 body={clickDateTime:new Date(),ipAddress:req.ip,browser:req.useragent.browser,platform:req.useragent.platform,device:'desktop'}
            }
            Url.findOneAndUpdate(
                { _id: url._id }, 
                { $push: { clicks: body} },
                {new:true},
                function(err,doc){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('updoc',doc)
                    }
                }
               );
        
            res.redirect(url.originalUrl)
        })
        .catch((err)=>{
            res.json(err)
        })     
   
}
module.exports=urlsCltr