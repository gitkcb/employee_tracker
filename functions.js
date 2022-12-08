import inquirer from "inquirer";

//function to show all departments
showDepartments = () => {
    console.log("All Departments");
   db.query(`SELECT department.id AS id, department.name AS department FROM department`, function (err, results) {
    console.log(results);
})};
viewAllEmployees = () => {
    console.log("All Employees");
    db.query(`SELECT employee.id AS id,employee.first_name, employee.last_name, role.title, department.name AS department, role.salary`, function (err, results){
        console.log(results);
    })
};
viewAllRoles = () => {
    console.log("All Roles");
    db.query(`SELECT role.id AS id, role.title, role.salary`, function (err, results){ 
        console.log(results);
    })
}
updateEmployeeRole = () => {
  const employeeRole = `SELECT * FROM employee`;
   inquirer.prompt([{
    type: 'list',
    name: 'name',
    message: "Which employee would you like to update?",
    choices: employees
   }
]) 
.then(employeeUpdate => {
    const employee = employeeUpdate.name;
    const params = [];
    params.push(employee);

    const roleUpdate = `SELECT * FROM role`;

    inquirer.prompt([
        {
            type: 'list',
            name: "role",
            message: "What is the employee's new role?",
            choices: roles
        }
    ])
    .then(updateNewRole => {
        const role = updateNewRole.role;
        params.push(role);
        
        
    })
})
}
addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'addDepartment',
        message: "What department do you want to add?",
        validate: addDepartment => {
            if (addDepartment) {
                return true;
            }else {
                console.log("Enter new department");
                return false;
            }
        }
    }]
    )
    .then(results => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, results.addDepartment, (err, result) => {
            if (err) throw err;
            console.log(`Added ${results.addDepartment} to departments`);
        showDepartments();
        })
    })
}