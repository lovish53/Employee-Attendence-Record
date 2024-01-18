const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
    Email:String,
    Password:String
})


module.exports=mongoose.model('reg',employeeSchema)