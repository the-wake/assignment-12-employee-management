const db = require('./db.js');
const cTable = require('console.table');

function getDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        deptsReturn = results.map(({ id, name }) => ({ name: `${id}:${name}` }));
    })
};

function getRoles() {
    db.query(`SELECT * FROM role;`, (err, results) => {
        rolesReturn = results.map(({ id, title, salary, department_id, }) => ({ name: `${id}:${title}`, salary, department_id }));
    })
};

function getEmps() {
    db.query(`SELECT * FROM employee;`, (err, results) => {
        empsReturn = results.map(({ id, first_name, last_name, role_id, manager_id, }) => ({ name: `${id}:${first_name} ${last_name}`, role_id, manager_id }));
    })
};

function newDept(data) {
    let deptVar = data.deptName;
    db.query(`INSERT INTO department (name) VALUES (?);`, deptVar)
};

function newRole(data) {
    let { roleName, roleSal } = data;
    let roleId = data.roleDept.split(':')[0];
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleName, roleSal, roleId]);
};

function newEmp(data) {
    let { firstName, lastName } = data;
    let empRole = data.empRole.split(':')[0];
    let empMngr = data.empMngr.split(':')[0];
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, empRole, empMngr]);
};

function changeEmp(data) {
    let { chooseEmp, empRole} = data;
    empRole = empRole.split(':')[0];
    chooseEmp = chooseEmp.split(':')[0];
    db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [empRole, chooseEmp]);
};

module.exports = { getDepts, getRoles, getEmps, newDept, newRole, newEmp, changeEmp };
