const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

const inquirer = require('inquirer');
const fs = require('fs');
// const path = require("path");

const employeesArray = [];
const rolesArray = [];
const departmentsArray = [];

const ask = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'Add Employee',
                    'Add Department',
                    'Add Role',
                    'View Employees',
                    'View Departments',
                    'View Roles',
                    'Update Employee Roles',
                    new inquirer.Separator(),
                    'DONE'
                ]
            }
        ])

        .then(answers => {
            switch (answers.action) {
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Update Employee Roles':
                    updateRoles();
                    break;
                case 'DONE':
                    return;
            }
        })
        
        .catch(error => {
            console.log(error);
        })
};

// When user selects 'View Roles' from first question
const viewRoles = () => {
    console.log(rolesArray);
}

// When user selects 'View Departments' from first question
const viewDepartments = () => {
    console.log(departmentsArray);
}

// When user selects 'View Employees' from first question
const viewEmployees = () => {
    console.log(employeesArray);
}

// When user selects 'Add Role' from first question
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'salary',
                validate: answer => {
                    if (!answer) {
                     return 'Please enter a valid number.'
                    }
                    return true
                }
            }
        ])

        .then (answers => {
            rolesArray.push(answers.title);
            new Role (answers.title, answers.salary);
            console.log(`****** ${answers.title} added successfully! ******`);
            ask();
        })
}

// When user selects 'Add Department' from first question
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'dept_name'
            }
        ])

        .then(answers => {
            departmentsArray.push(answers.dept_name);
            new Department(answers.dept_name);
            console.log(`****** ${answers.dept_name} added successfully! ******`);
            ask();
        })
}

// When user selects 'Add Employee' from first question
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'last_name'
            },
            {
                type: 'list',
                message: 'What is the employee\'s role?',
                name: 'employee_role',
                choices: rolesArray
            },
            // {
            //     type: 'list',
            //     message: 'Who is the employee\'s manager?',
            //     name: 'employee_manager',
            //     choices: employees
            // }
        ])

        .then(answers => {
            const employee = new Employee(answers.first_name, answers.last_name, answers.employee_role, answers.employee_manager);
            employeesArray.push(employee);
            console.log(`****** ${answers.first_name} ${answers.last_name} added successfully! ******`);
            // console.log(employee);
            ask();
        })
}

ask();