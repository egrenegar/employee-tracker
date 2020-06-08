// require app.js so that ask() function can be accessed
const app = require('../app');

class Employee {
    constructor (connection, firstName, lastName, role) {
        this.connection = connection;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        // this.manager = manager;
    }

    createEmployee() {
        console.log("Adding a new Employee...\n");
        this.connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: this.firstName,
                last_name: this.lastName,
                role_id: this.role,
                manager_id: null
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee added!\n");
                app.ask();
            }
        );
    }

    readEmployee() {

    }

    updateEmployee() {

    }

    deleteEmployee() {

    }
}

module.exports = Employee;