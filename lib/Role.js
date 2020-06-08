// require app.js so that ask() function can be accessed
const app = require('../app');

class Role {
    constructor(connection, title, salary) {
        this.connection = connection;
        this.title = title;
        this.salary = salary;
    }

    createRole() {
        console.log("Adding a new role...\n");
        this.connection.query(
            "INSERT INTO role SET ?",
            {
                title: this.title,
                salary: this.salary
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role added!\n");
                app.ask();
            }
        );
    }

    readRole() {
        console.log("Displaying all roles...\n");
        this.connection.query("SELECT title, salary, department_name FROM role LEFT JOIN department ON role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            app.ask();
        });
    }

    updateRole() {

    }

    deleteRole() {

    }
}

module.exports = Role;