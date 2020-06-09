// classes/constructors
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

// dependencies
var mysql = require('mysql');
const inquirer = require('inquirer')

// connecting to mySQL database
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

// user is asked initial question
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
                case 'EXIT':
                    connection.end();
            }
        })

        .catch(error => {
            console.log(error);
        })
};

// When user selects 'View Roles' from initial question
const viewRoles = () => {
    connection.query("SELECT title, department_name, salary FROM role LEFT JOIN department ON role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            ask();
        });
}

// When user selects 'View Departments' from initial question
const viewDepartments = () => {
    connection.query("SELECT department_name FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            ask();
        });
}

// When user selects 'View Employees' from initial question
const viewEmployees = () => {
    connection.query("SELECT employee.id, first_name, last_name, department_name, title, salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            ask();
        });
}

// When user selects 'Add Role' from initial question
const addRole = () => {
    // get Department info from database to use in choices array
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
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
                    // validate that the user's input is a number (Doesn't work properly when answer is invalid!!)
                    validate: function (input) {
                        if (isNaN(parseFloat(input)) === false) {
                            return true;
                        } else {
                        return "Please enter a number";
                        }
                    },
                    filter: Number
                },
                {
                    type: 'list',
                    message: 'What department does the role belong to?',
                    name: 'department',
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].department_name);
                        }
                        return choiceArray;
                    }
                    
                }
            ])

            .then(answers => {
                let department_id;
                for (let i = 0; i < res.length; i++) {
                    if (answers.department === res[i].department_name) {
                        department_id = res[i].id;
                    }
                }
                const role = new Role(connection, answers.title, answers.salary, department_id);
                role.createRole();
            })
    })

}

// When user selects 'Add Department' from initial question
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
            const department = new Department(connection, answers.dept_name);
            department.createDepartment();
        })
}

// When user selects 'Add Employee' from initial question
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

// When user selects 'Update Employee Roles' from initial question
const updateRoles = () => {
    connection.query('SELECT first_name, last_name, title, role.id FROM employee LEFT JOIN role ON employee.role_id = role.id', 
    function (err, res) {
        if (err) throw err;
        // console.log(res)
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee\'s role would you like to update?',
                name: 'employee',
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {

                        choiceArray.push(res[i].first_name + ' ' + res[i].last_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: 'list',
                message: 'What is the employee\'s NEW role?',
                name: 'new_role',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                }
            }
        ])

        .then(answers => {
            let roleId;
            for (let i = 0; i < res.length; i++) {
                if (answers.new_role === res[i].title) {
                    roleId = res[i].id;
                    const first_name = answers.employee.split(' ')[0];
                    const last_name = answers.employee.split(' ')[1];

                    const updatedRole = new Employee (connection, first_name, last_name, roleId)
                    updatedRole.updateEmployee();
                }
            }
        })
    })
}

// export the ask() function
exports.ask = ask;