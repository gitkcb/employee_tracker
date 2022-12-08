import inquirer from "inquirer";

//function to show all departments
viewAllDepartments = () => {
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
addEmployee = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log ('Please enter a first name');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            validate: addLastName => {
                if(addLastName) {
                    return true;
                }else {
                    console.log ('Please enter a last name');
                    return false;
                }
            }
        }
    ])
    .then(result => {
        const params = [result.firstName, result.lastName]
    const roleSql = `SELECT role.id, role.title FROM role`;
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "what is the employee's role?",
            choices: role
        }
    ])
    .then(roleChoice => {
        const role = roleChoice.role;
        params.push(role);

        let employee = params[0]
        params[0] = role
        params[1] = employee

        const db = `UPDATE employee SET role_id = ? WHERE ID =?`;
        db.query(sql, params, (err, result) => {
            if (err) throw err;
        console.log( "Employee has been created");
        viewAllEmployees();
        });
    });
    });
};
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
addRole = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'role',
        message: 'What role would you like to add?',
        validate: addNewRole => {
            if(addNewRole) {
                return true;
            }else { 
                console.log('Please enter a new role.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the salary?",
        validate: newSalary => {
            if (isNaN(newSalary)) {
                return true;
            }else {
                console.log("You must enter a salary for this position.");
                return false
            }
        }

    }
])
.then(result => {
    const params = [result.role, result.salary];

    const roleSql = `SELECT name, id FROM department`;
    db.query(roleSql, (err,data) => {
        if(err) throw err;

        inquirer.prompt([
            {
                type: 'list',
                name: 'dept',
                message: "What department is this position in?",
                choices: department
            }
        ])
        .then(departmentChoice => {
            const department = departmentChoice.department;
            params.push(department);
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;

            db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log(`Added ${result.role} to roles`);
                viewAllRoles();
            });
        });
    });
});
};
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
        viewAllDepartments();
        })
    })
}