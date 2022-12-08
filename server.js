import inquirer from 'inquirer';
import mysql  from 'mysql2';
import consoleTable from 'console.table';

const PORT = process.env.PORT || 3001;



const db = mysql.createConnection({    
    host: 'localhost',
    user: 'root',
    password: "Winesciencevision420$",
    database: "employee_db",
},
console.log('Connected to the employees_db database'),

);
pageGreeting();
pageGreeting = () => {
    console.log("Welcome to the employee database!")
    employeeInfo();
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
    if(results === "View All Departments") {
        showDepartments();
    }
    if(results === "View All Employees") {
         viewAllEmployees();
    }
    if(results === "View All Roles") {
        viewAllRoles();
    }
    if(results === "Add Employee") {
        addEmployee();
    }
    if(results === "Update Employee Role"){
        updateEmployeeRole();
    }
    if(results === "Add Role"){
        addRole();
    }
    if(results === "Add Department"){
        addDepartment();
    }
    if(results === "Quit"){
        endFunction()   
     }

})}



