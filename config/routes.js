const express=require('express')

const urlsCltr=require('../app/controllers/urlsCltr')
const usersCltr=require('../app/controllers/usersCltr')
const {authenticate} = require('../app/middlewares/authenticate')

const router=express.Router()


router.post('/api/users/register',usersCltr.register)
router.post('/api/users/login',usersCltr.login)
router.get('/api/users/account',authenticate,usersCltr.account)

router.get('/urls',urlsCltr.list)
router.post('/urls',authenticate,urlsCltr.create)
router.get('/urls/:id',authenticate,urlsCltr.show)
router.put('/urls/:id',authenticate,urlsCltr.update)
router.delete('/urls/:id',authenticate,urlsCltr.destroy)
router.get('/:hash',urlsCltr.showHash)

module.exports=router