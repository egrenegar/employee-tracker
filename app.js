const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

const inquirer = require('inquirer');
const fs = require('fs');
// const path = require("path");



const employeesArray = [];
const rolesArray = ['Software Engineer', 'Project Manager'];
const departmentsArray = [];

function init() {
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
                    'Update Employee Roles'
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
            }
        })
};

// If user selects 'Add Role' from first question
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
                // validate: input => {
                //     if (input) {
                //         return;
                //     } else {
                //         return 'Please enter a valid number';
                //     }
                // }
            }
        ])

        .then (answers => {
            const role = new Role (answers.title, answers.salary);
            rolesArray.push(role);
            console.log(rolesArray);
        })
}

// If user selects 'Add Department' from first question
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
            const department = new Department(answers.dept_name);
            departmentsArray.push(department);
            console.log(departmentsArray);
        })
}

// If user selects 'Add Employee' from first question
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
            console.log(employeesArray);
        })
}

init();