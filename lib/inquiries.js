const inquirer = require('inquirer');

const db = require('./db.js')
var { fakeArr, deptsArr, rolesArr, mngrsArr } = require('./data.js')
const { getDepts, getRoles, getMngrs, newDept, newRole, newEmp, changeEmp, renderTable } = require('./query-render.js');

function addDept() {
    inquirer.prompt(
        {
            type: 'input',
            message: `What is the name of the department?`,
            name: 'deptName',
        },
    )
    .then((answers) => {
        console.log('deptsArr');
        newDept(answers);
    })
};

function addRole() {
    console.log(deptsArr);
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the name of the role?`,
            name: 'roleName',
        },
        {
            type: 'number',
            message: `What is the salary for this role?`,
            name: 'roleSal',
        },
        {
            type: 'list',
            message: `What department does this role fall under?`,
            choices: deptsArr,
            name: 'roleDept',
        },
    ])
    .then((answers) => {
        console.log('deptsArr');
        newRole(answers)
        logDepts();
    });
};

function logDepts() {
    console.log(deptsArr);
}

function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is this employee's first name?`,
            name: 'firstName',
        },
        {
            type: 'input',
            message: `What is this employee's last name?`,
            name: 'lastName',
        },
        {
            type: 'list',
            message: `What is this employee's role?`,
            choices: rolesArr,
            name: 'empRole',
        },
        {
            type: 'list',
            message: `Who is this employee's manager?`,
            choices: mngrsArr,
            name: 'empMngr',
        },
    ])
    .then((answers) => {
        newEmp(answers)
    })
};

function updateEmp() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to modify?',
            choices: getEmps(),
            name: 'chooseEmp',
        },
        {
            type: 'list',
            message: "Enter the employee's new role",
            choices: getRoles(),
            name: 'empRole',
        }
    ])
    .then((answers) => {
        changeEmp(answers);
    })
};

function terminate() {
    console.log('Closing application...');
};

module.exports = { addDept, addRole, addEmp, updateEmp, terminate };





// function createDept() {
//     addDept();
// };

// async function createRole() {
//     await getDepts();
//     addRole();
// };

// function createEmp() {
//     getRoles();
//     getEmps();
//     addEmp();
// }

// function modifyEmp() {
//     getEmps();
//     getRoles();
//     updateEmp();
// }