const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// const data = 
// [
//     { "EmployeeName": "David Lee", "EmployeeDesignation": "Senior Software Engineer", "EmployeeLocation": "New York", "Salary": 90000 },
//     { "EmployeeName": "Sarah Jones", "EmployeeDesignation": "Product Manager", "EmployeeLocation": "San Francisco", "Salary": 105000 },
//     { "EmployeeName": "Rajesh Sharma", "EmployeeDesignation": "Data Scientist", "EmployeeLocation": "Bangalore", "Salary": 85000 },
//     { "EmployeeName": "Oliver Smith", "EmployeeDesignation": "UX Designer", "EmployeeLocation": "London", "Salary": 78000 },
//     { "EmployeeName": "Maria Garcia", "EmployeeDesignation": "DevOps Engineer", "EmployeeLocation": "Toronto", "Salary": 95000 },
//     { "EmployeeName": "Chen Li", "EmployeeDesignation": "AI Researcher", "EmployeeLocation": "Beijing", "Salary": 110000 },
//     { "EmployeeName": "Ava White", "EmployeeDesignation": "Content Strategist", "EmployeeLocation": "Berlin", "Salary": 75000 },
//     { "EmployeeName": "Noah Miller", "EmployeeDesignation": "Full Stack Developer", "EmployeeLocation": "Sydney", "Salary": 88000 },
//     { "EmployeeName": "Chloe Brown", "EmployeeDesignation": "HR Manager", "EmployeeLocation": "Mumbai", "Salary": 70000 },
//     { "EmployeeName": "Jacob Martin", "EmployeeDesignation": "Cybersecurity Analyst", "EmployeeLocation": "Washington D.C.", "Salary": 97000 },
//     { "EmployeeName": "Aryan Singh", "EmployeeDesignation": "Artist", "EmployeeLocation": "Trivandrum.", "Salary": 60000 } 
//   ]

const employeeModel = require('../model/employeeData');

function employeeroutes(nav) {
        router.get('/data', async (req, res) => {
            try {
                const data = await employeeModel.find()
                res.render("home",{
                    title:'Employee Database',
                    data,
                    nav
                })
            } catch (error) {
                res.status(404).send('Error 404 not found');
            }
        });
    
        router.get('/form', (req, res) => {
            res.render("form", {
                title:"Add Employee",
                nav
            });
        });
    
        router.post('/add', async(req, res) => {
            try {
                var item = req.body;
                const data = new employeeModel(item); // creating an instance of model file and embedding item into it
                await data.save();
                res.redirect('/server/data')
            } catch (error) {
                res.status(400).send('Post unsuccessful')
            }
        })
    
        router.get('/edit/:index', async (req, res) => {
            try {
                const employee = await employeeModel.findById(req.params.index); 
                if (!employee) {
                    return res.status(404).send('Employee not found');
                }
                res.render("updateform", {
                    nav,
                    employee, // Pass employee object to the template
                    employeeid: req.params.index, // Pass the ID to the template
                });
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error');
            }
        });
    
        router.post('/update/:index', async (req, res) => {
            try {
                await employeeModel.findByIdAndUpdate(req.params.index, req.body, { new: true }); // `new: true` returns updated document
                res.redirect('/server/data');
            } catch (error) {
                console.error(error);
                res.status(404).send('Update unsuccessful');
            }
        });
        
    
        router.post('/delete/:index', async(req, res) => {
            try {
                const data= await employeeModel.findByIdAndDelete(req.params.index);
                if(data){
                    res.status(200).send('Delete successful');
                } else {
                    res.status(404).send('Item not found');
                }
            } catch (error) {
                res.status(400).send('Delete unsuccessful');
            }
        });
    
        return router;
    }
    
    module.exports = employeeroutes;
