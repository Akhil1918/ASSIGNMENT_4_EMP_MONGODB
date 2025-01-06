const mongoose=require('mongoose');
const employeeSchema=mongoose.Schema({  //  Define the structure of the document (e.g., name, age).
    EmployeeName:String,
    EmployeeDesignation:String,
    EmployeeLocation:String,
    EmployeeSalary:Number

})

const employeeData=mongoose.model('employee',employeeSchema) // my collection name in atlas is movies(omiited the s here), so the structure here gets pushed to my collection 

module.exports=employeeData;