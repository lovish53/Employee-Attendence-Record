const mongoose=require('mongoose')


const EmpSchema=mongoose.Schema({
    EmpId:String,
    EmpName:String,
    EmpDepartment:String,
    EmpSalary:Number,
    EmpInTime:Date,
    EmpOutTime:Date,
    EmpWorkTime:Number,
    status:String,
    EmpAttendence:String

})


module.exports=mongoose.model('employee',EmpSchema)