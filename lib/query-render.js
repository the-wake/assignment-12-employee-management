const db = require('./db.js');
const util = require('util');

var { rolesArr, deptsArr, mngrsArr } = require('./data.js');

function getDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        deptsReturn = results.map(({ id, name }) => ({ id: id, name: name }));
        console.table(deptsReturn);
        return deptsReturn;
    })
}

function getRoles() {
    console.log('Working on getRoles.')
};

function getMngrs() {
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

function setArr(array) {
    let choice = array;
    let choiceStr = String(array);
    choice = [];
    switch (choiceStr) {
        case 'deptsArr':
            deptsArr = getDepts();
            break;
        case 'rolesArr':
            rolesArr = getRoles();
            break;
        case 'mngrsArr':
            mngrsArr = getMngrs();
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

module.exports = { getDepts, getRoles, getMngrs, newDept, newRole, newEmp, changeEmp, setArr, renderTable }

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
