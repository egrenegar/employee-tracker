var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "rootroot",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createEmployee();
});

class Employee {
    constructor (firstName, lastName, role, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    createEmployee() {

    }

    readEmployee() {

    }

    updateEmployee() {

    }

    deleteEmployee() {

    }
}

module.exports = Employee;