//function to show all departments
showDepartments = () => {
    console.log("All Departments");
   db.query(`SELECT department.id AS id, department.name AS department FROM department`, function (err, results) {
    console.log(results);
})};
viewAllEmployees = () => {
    console.log("All Employees");
    db.query(`SELECT employee.id AS id,employee.first_name, employee.last_name`, function (err, results){
        console.log(results);
    })
};
viewAllRoles = () => {
    console.log("All Roles");
    db.query(`SELECT role.id AS id, role.title, role.salary`, function (err, results){ 
        console.log(results);
    })
}