// require app.js so that ask() function can be accessed
const app = require('../app');

class Department {
  constructor(connection, name) {
    this.connection = connection;
    this.name = name;
  }

  createDepartment() {
    console.log("\nAdding a new department...\n");
    this.connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: this.name
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department added!\n");
        app.ask();
      }
    );
  }

  readDepartment() {

  }

  updateDepartment() {

  }

  deleteDepartment() {

  }

}

module.exports = Department;