const Employee=require('../models/employee')

exports.holidaypage=(req,res)=>{
   res.render('holiday.ejs')
}
exports.employeepage=async(req,res)=>{
    const email=req.session.Email
    const record= await Employee.find()
   res.render('employee.ejs',{email,record})
}

exports.logout=(req,res)=>{
req.session.destroy()
res.redirect('/')
}

exports.employeeform=(req,res)=>{
         res.render('employeeform.ejs')
}

exports.addemployee=(req,res)=>{
    const{ename,eid,edepart,ESalary}=req.body
    req.session.EmpSalary
    const record=new Employee({EmpId:eid,EmpName:ename,EmpDepartment:edepart,status:"IN",EmpSalary:ESalary})
    record.save()
    res.redirect('/employee')
}

exports.employeeupdate=async(req,res)=>{
     const id=req.params.id
     const Etime=new Date()
     const record= await Employee.findById(id)
    await Employee.findByIdAndUpdate(id,{EmpInTime:Etime,status:'OUT',EmpOutTime:null,EmpAttendence:null,EmpWorkTime:null})
    res.redirect('/employee')
}

exports.employeeoutupdate=async(req,res)=>{
      const id=req.params.id
      const record= await Employee.findById(id)
      const outTime=new Date()
      let consumedTime=(outTime-record.EmpInTime)/(1000*60*60)
      let ESalary=record.EmpSalary
      if(consumedTime>=8 && consumedTime<=10 ){
         EmpAttendence="Present"
         ESalary=ESalary
      }
      else if(consumedTime>=10){
         EmpAttendence="OverTime"
         ESalary=ESalary+500
      }
      else if(consumedTime>=0 && consumedTime<=3){
         EmpAttendence="Absent"
         ESalary=ESalary-700
      }
      else{
         EmpAttendence='half Day'
         ESalary=ESalary-400
      }
      await Employee.findByIdAndUpdate(id,{EmpOutTime:outTime,status:'IN',EmpWorkTime:Math.round(consumedTime),EmpAttendence:EmpAttendence,EmpSalary:ESalary})
      res.redirect('/employee')
}
     

