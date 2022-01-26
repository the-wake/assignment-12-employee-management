SELECT employee.first_name, employee.last_name, role.title, role.salary FROM employee
JOIN role ON employee.role_id = role.id;
