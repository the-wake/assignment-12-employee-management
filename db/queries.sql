SELECT * FROM role
INNER JOIN department
ON role.department_id=department.id;

SELECT * FROM employee
INNER JOIN role
ON employee.role_id=role.id;

UPDATE employee SET role_id = 1 WHERE id = 7;
