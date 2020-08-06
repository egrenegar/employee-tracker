// require app.js so that ask() function can be accessed
const app = require('../app');

class Role {
    constructor(connection, title, salary, department_id) {
        this.connection = connection;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    createRole() {
        console.log("\nAdding a new role...\n");
        this.connection.query(
            "INSERT INTO role SET ?",
            {
                title: this.title,
                salary: this.salary,
                department_id: this.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role added!\n");
                app.ask();
            }
        );
    }

    readRole() {
        
    }

    updateRole() {
      
    }

    deleteRole() {

    }
}

module.exports = Role;