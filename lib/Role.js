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
    createRole();
});

class Role {
    constructor(title, salary) {
        this.title = title;
        this.salary = salary;
    }

    createRole() {

    }

    readRole() {

    }

    updateRole() {

    }

    deleteRole() {
        
    }
}

module.exports = Role;