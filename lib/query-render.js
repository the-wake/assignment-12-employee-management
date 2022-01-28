const db = require('./db.js');
const util = require('util');

var { rolesArr, deptsArr, mngrsArr } = require('./data.js');
// var addRole = require('./inquiries.js/')

function getDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        deptsReturn = results.map(({ id, name }) => ({ name: `${id}:${name}` }));
    })
};

function getRoles() {
    db.query(`SELECT * FROM role;`, (err, results) => {
        rolesReturn = results.map(({ id, title, salary, department_id, }) => ({ name: `${id}:${title}`, salary, department_id }));
        console.table(rolesReturn);
    })
};

function getMngrs() {
    db.query(`SELECT * FROM employee;`, (err, results) => {
        mngrsReturn = results.map(({ id, first_name, last_name, role_id, manager_id, }) => ({ name: `${id}:${first_name} ${last_name}`, role_id, manager_id }));
    })
};

function newDept(data) {
    let deptVar = data.deptName;
    db.query(`INSERT INTO department (name) VALUES (?);`, deptVar)
    renderTable('department');
};

function newRole(data) {
    // console.log(data);
    let { roleName, roleSal } = data;
    let roleId = data.roleDept.split(':')[0];
    console.log(data);
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleName, roleSal, roleId]);
    renderTable('role');
};

function newEmp(data) {
    console.log(data);
    let { firstName, lastName } = data;
    let empRole = data.empRole.split(':')[0];
    let empMngr = data.empMngr.split(':')[0];
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

function setArr(array) {
    let choiceStr = String(array);
    switch (choiceStr) {
        case 'deptsArr':
            getDepts();
            break;
        case 'rolesArr':
            getRoles();
            break;
        case 'mngrsArr':
            getMngrs();
            break;
    }
}

function renderTable(table) {
    db.query(`SELECT * FROM ??;`, table, (err, results) => {
        if (err) {
            console.error(err);
        }
        console.table(results);
    })
};

module.exports = { getDepts, getRoles, getMngrs, newDept, newRole, newEmp, changeEmp, setArr, renderTable, deptsArr }

// getDepts();


// const selectFromTable = util.promisify(db.query);
// selectFromTable().then(()=>{console.log("test");})

// function getDepts() {
//     db.query(`SELECT * FROM department;`, (err, results) => {
//         // return [1,2,3]
//         roleReturn = results.map(({ id, name }) => ({ id: id, name: name }));
//         console.log(roleReturn);
//     })
//     // console.log(roleReturn);
//     // roleReturn = await db.query(`SELECT * FROM department;`);
//     // console.log(roleReturn);
//     // return roleReturn;
// };
