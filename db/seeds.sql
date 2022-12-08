INSERT INTO department (name)
VALUES 
("Natural Science"),
("Technology"),
("Finance"),
("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES
("Biologist", 45000, 1),
("Chemist", 50000, 1),
("Physicist", 75000, 1),
("Front-end Developer", 60000, 2),
("Back-end Developer", 70000, 2),
("Analyst", 100000, 3),
("Restaurant Server", 15000, 4),
("Restaurant Line Cook", 35000, 4),
("Restaurant Management", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Tyler", "Fox", 1, null),
("Jade", "Beck", 2, null),
("Renee", "Olsen", 3, null),
("Kevin", "Daniels", 4, null),
("Julia", "Smith", 5, null),
("Alexandra", "Gomez", 6, null),
("Elizabeth", "Shapiro", 7, null),
("Janet", "Goldberg", 8, null),
("Jose", "Rodriguez", 9, null);
