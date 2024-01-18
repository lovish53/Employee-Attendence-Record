const express=require('express')
const app=express()
const clothesRouter=require('./routers/employee')
const session=require('express-session')
app.use(express.urlencoded({extended:false}))
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/employeeproject')
app.use(session({
    secret:'lovish',
    resave:false,
    saveUninitialized:false
}))


app.use(clothesRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000,()=>{console.log('server is running on port 5000')})
