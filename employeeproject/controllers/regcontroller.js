const Reg=require('../models/reg')
const bcrypt=require('bcrypt')

exports.loginpage=(req,res)=>{
    res.render('login.ejs',{message:''})
}

exports.registerpage=(req,res)=>{
          res.render('register.ejs',{message:''})
}
exports.register=async(req,res)=>{
    const {email,pass}=req.body
    const passconverted=await bcrypt.hash(pass,10)
    const usercheck=await Reg.findOne({Email:email})
    if(usercheck==null){
        const record= new Reg({Email:email,Password:passconverted})
        record.save()
        res.render('register.ejs',{message:`${email} username successfully created`})
    }
    else{
        res.render('register.ejs',{message:`${email} username already exists`})
    }
}

exports.logincheck=async(req,res)=>{
    const{email,pass}=req.body
    const record=await Reg.findOne({Email:email})
    if(record!==null){
    const passwordcompare=await bcrypt.compare(pass,record.Password)
     if(passwordcompare){
        req.session.isAuth=true
        req.session.Email=email
        let date=new Date()
        if(date.getDay()==6 || date.getDay()==0){
        res.redirect('/holiday')
        }
        else{
        res.redirect('/employee')
        }
     }
     else{
        res.render('login.ejs',{message:'Wrong Credentials'})
     }
    }
    else{
        res.render('login.ejs',{message:'Wrong Credentials'})
    }
}

