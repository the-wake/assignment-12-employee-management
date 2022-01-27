const db = require('./db.js')

function getDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        // return [1,2,3]
        var roleReturn = results.map(({ id, name }) => ({ id: id, name: name }));
        console.log(roleReturn);
        return roleReturn;
    })
};

function getRoles() {
    console.log('Working on getRoles.')
};

function getEmps() {
    console.log('Working on getEmps.')
};

function newDept(data) {
    let deptVar = data.deptName;
    db.query(`INSERT INTO department (name) VALUES (?);`, deptVar)
    renderTable('department');
};

function newRole(data) {
    // console.log(data);
    let { roleName, roleSal, roleDept } = data;
    console.log(roleDept);
    roleDept = roleDept.split(':')[0];
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleName, roleSal, roleDept]);
    renderTable('role');
};

function newEmp(data) {
    let { firstName, lastName, empRole, empMngr } = data;
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, empRole, empMngr]);
    renderTable('employee');
};

// Need to make sure this one works.
function changeEmp(data) {
    let { chooseEmp, empRole} = data;
    chooseEmp = empRole.split(':')[0];
    empRole = empRole.split(':')[0];
    db.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`, [empRole, chooseEmp]);
    renderTable('employee');
};

function renderTable(table) {
    db.query(`SELECT * FROM ??;`, table, (err, results) => {
        if (err) {
            console.error(err);
        }
        console.table(results);
    })
};

module.exports = { getDepts, getRoles, getEmps, newDept, newRole, newEmp, changeEmp, renderTable }
