const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoleTable = require('console.table');

require("dotenv").config();




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: "employee_db",
},
    console.log('Connected to the employees_db database'),

);





viewAllDepartments = async () => {
    console.log("All Departments");
    try {
        const [results] = await db.promise().query(`SELECT department.id AS ID, department.name AS Department FROM department`)
        console.table(results);
        employeeInfo();
    } catch (err) {
        console.log(err);
    }
};
viewAllEmployees = async () => {
    console.log("All Employees");
    try {
        const [results] = await db.promise().query(`SELECT employee.id AS id,employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id `)
        console.table(results);
        employeeInfo();
    } catch (err) {
        console.log(err);
    }

};
viewAllRoles = () => {
    console.log("All Roles");
    db.query(`SELECT role.id AS id, role.title, role.salary FROM role`, function (err, results) {
        if (err) {
            console.log(err);
            return
        }
        console.table(results);
        employeeInfo();
    })
}
addEmployee = async () => {
    const [role] = await db.promise().query(`SELECT role.id AS value, role.title AS name FROM role`);
    const [employee] = await db.promise().query(`SELECT id AS value, last_name AS name FROM employee`);
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role_id',
            message: "what is the employee's role?",
            choices: role
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "what is the employee's manager?",
            choices: employee
        }
    ])

        .then(async data => {

            const sql = `INSERT INTO employee SET ?`;
            await db.promise().query(sql, data)
            console.log("Employee has been created");
            viewAllEmployees();


        });
};
updateEmployeeRole = async () => {
    const [employee] = await db.promise().query(`SELECT employee.id AS value, employee.last_name AS name FROM employee`);
    const [roleUpdate] = await db.promise().query(`SELECT role.id AS value, role.title AS name FROM role`);


    inquirer.prompt([{
        type: 'list',
        name: 'last_name',
        message: "Which employee would you like to update?",
        choices: employee
    },
    {

        type: 'list',
        name: "title",
        message: "What is the employee's new role?",
        choices: roleUpdate

    }
    ])
        .then(async data => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            await db.promise().query(sql, [data.title, data.last_name])
            console.log("Employee has been updated");
            employeeInfo();
        });
    
};
addRole = async () => {
    const [department] = await db.promise().query(`SELECT department.id AS value, department.name AS name FROM department`);
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
            validate: addNewRole => {
                if (addNewRole) {
                    return true;
                } else {
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
                if (newSalary) {
                    return true;
                } else {
                    console.log("You must enter a salary for this position.");
                    return false
                }
            }

        },
        {
            type: 'list',
            name: 'department_id',
            message: "What department is this position in?",
            choices: department
        }
    ])
        .then(async data => {
            const sql = `INSERT INTO role SET ?`;
            await db.promise().query(sql, data)
            console.log("Role has been created");
            employeeInfo();

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
            } else {
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
const employeeInfo = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "question",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],

        }
    ])

        .then((results) => {
            const { question } = results;
            if (question === "View All Departments") {
                viewAllDepartments();
            }
            if (question === "View All Employees") {
                viewAllEmployees();
            }
            if (question === "View All Roles") {
                viewAllRoles();
            }
            if (question === "Add Employee") {
                addEmployee();
            }
            if (question === "Update Employee Role") {
                updateEmployeeRole();
            }
            if (question === "Add Role") {
                addRole();
            }
            if (question === "Add Department") {
                addDepartment();
            }
            if (question === "Quit") {
                connection.end()
            }

        })
}
pageGreeting = () => {
    console.log("Welcome to the employee database!")
    employeeInfo();
};
pageGreeting();

