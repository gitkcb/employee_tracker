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
console.log('Connected to the employees_db database')

);

const employeeInfo = () => {
inquirer.prompt([
    {
        type: "list",
        name: "question",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employer", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"],

    }
])}
employeeInfo();
