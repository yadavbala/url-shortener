const express=require('express')
const configureDB=require('./config/database')
const useragent=require('express-useragent')
const router=require('./config/routes')
const {PORT}=require('./utils/configure-env')
const app=express()

app.use(express.json())
app.use(useragent.express())

const port=PORT

configureDB()

app.use(router)

app.listen(port,()=>{
    console.log('listening to server',port)
})