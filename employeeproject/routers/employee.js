const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const employeec=require('../controllers/employeecontroller')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/')
    }
}

router.get('/',regc.loginpage)
router.get('/reg',regc.registerpage)
router.post('/reg',regc.register)
router.post('/',regc.logincheck)
router.get('/employee',handlelogin,employeec.employeepage)
router.get('/holiday',handlelogin,employeec.holidaypage)
router.get('/logout',employeec.logout)
router.get('/addemployee',employeec.employeeform)
router.post('/addemployee',employeec.addemployee)
router.get('/employeeupdate/:id',employeec.employeeupdate)
router.get('/employeeoutupdate/:id',employeec.employeeoutupdate)


module.exports=router