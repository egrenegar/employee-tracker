const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

var mysql = require('mysql');
const inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "rootroot",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    ask();
});

const ask = () => {
    inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View All Employees',
                    'View All Departments',
                    'View All Roles',
                    'Add Employee',
                    'Add Department',
                    'Add Role',
                    'Update Employee Roles',
                    new inquirer.Separator(),
                    'DONE'
                ]
            }
        ])

        .then(answers => {
            switch (answers.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Roles':
                    updateRoles();
                    break;
                case 'DONE':
                    connection.end();
            }
        })

        .catch(error => {
            console.log(error);
        })
};

// When user selects 'View Roles' from first question
const viewRoles = () => {
    console.log("Displaying all roles...\n");
    connection.query("SELECT title, salary, department_name FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
        if (err) throw err;
        console.log(res);
        ask();
    });
}

// When user selects 'View Departments' from first question
const viewDepartments = () => {
    readDepartment();
    ask();
}

// When user selects 'View Employees' from first question
const viewEmployees = () => {
    readEmployee();
    ask();
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
                validate: function (input) {
                    var valid = !isNaN(parseFloat(input));
                    return valid || "Please enter a number";
                },
                filter: Number
            }
        ])

        .then(answers => {
            const role = new Role(connection, answers.title, answers.salary);
            role.createRole();
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
            const department = new Department(answers.dept_name);
            department.createDepartment();
        })
}

// When user selects 'Add Employee' from first question
const addEmployee = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
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
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].title);
                        }
                        return choiceArray;
                    }
                }
                // {
                //     type: 'list',
                //     message: 'Who is the employee\'s manager?',
                //     name: 'employee_manager',
                //     choices: employeesArray
                // }
            ])

            .then(answers => {
                let roleID;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].title === answers.employee_role) {
                        roleID = res[i].id;
                    }
                }
                const employee = new Employee(connection, answers.first_name, answers.last_name, roleID);
                employee.createEmployee();
            })
    })
}


// export the ask() function
exports.ask = ask;