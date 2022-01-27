const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = require('express');
const cTable = require('console.table');

const db = require('./lib/db.js')
// const optionArr = require('./lib/questions.js');
const { createDept, createRole, createEmp, modifyEmp, terminate } = require('./lib/inquiries.js');
// const { getDepts, getRoles, getEmps, newDept, newRole, newEmp, changeEmp, renderTable } = require('./lib/query-render.js');

var fakeArr = ['1:Midrange', '2:Aggressive', '3:foo', '4:foo',];
var deptsArr = ['1:foo', '1:food', '1:foods'];
var rolesArr = ['1:foo', '1:food', '1:foods'];
var empArr = ['1:foo', '1:food', '1:foods'];

const optionArr = [
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Terminate Application',],
        name: 'optionSelect',
    },
];

module.exports = optionArr;

function optionSwitch(choice) {
    switch (choice) {
        case 'View All Departments':
            viewEl('department');
            break;
        case 'View All Roles':
            functArr[0]('role');
            break;
        case 'View All Employees':
            functArr[0]('employee');
            break;
        case 'Add a Department':    
            createDept();
            break;
        case 'Add a Role':
            createRole();
            break;
        case 'Add an Employee':
            createEmp();
            break;
        case 'Update an Employee Role':
            modifyEmp();
            break;
        case 'Terminate Application':
            terminate();
            break;
    }
};

function viewEl(choice) {
    console.log(`Viewing table "${choice}"`);
    db.query(`SELECT * FROM ??`, choice, (err, results) => {
        if (err) {
            console.error(err);
        }
        console.table(results);
    })
}


function init() {
    inquirer.prompt(optionArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

init();
// getDepts();






// const functArr = [
    // function addDept() {
    //     inquirer.prompt(
    //         {
    //             type: 'input',
    //             message: `What is the name of the department?`,
    //             name: 'deptName',
    //         },
    //     )
    //     .then((answers) => {
    //         newDept(answers);
    //     })
    // },
    
    // async function addRole() {
    //     // const validDepts = await getDepts()
    //     // console.log(validDepts)
    //     inquirer.prompt([
    //         {
    //             type: 'input',
    //             message: `What is the name of the role?`,
    //             name: 'roleName',
    //         },
    //         {
    //             type: 'number',
    //             message: `What is the salary for this role?`,
    //             name: 'roleSal',
    //         },
    //         {
    //             type: 'list',
    //             message: `What department does this role fall under?`,
    //             choices: getDepts(),
    //             name: 'roleDept',
    //         },
    //     ])
    //     .then((answers) => {
    //         newRole(answers)
    //     });
    //     // .then((answers) => {
    //     //     newRole(answers);
    //     //     // console.log(answers);
    //     // })
    // },
    // function addEmp() {
    //     inquirer.prompt([
    //         {
    //             type: 'input',
    //             message: `What is this employee's first name?`,
    //             name: 'firstName',
    //         },
    //         {
    //             type: 'input',
    //             message: `What is this employee's last name?`,
    //             name: 'lastName',
    //         },
    //         {
    //             type: 'list',
    //             message: `What is this employee's role?`,
    //             choices: getRoles(),
    //             name: 'empRole',
    //         },
    //         {
    //             type: 'list',
    //             message: `Who is this employee's manager?`,
    //             choices: getEmps(),
    //             name: 'empMngr',
    //         },
    //     ])
    //     .then((answers) => {
    //         newEmp(answers)
    //     })
    // },
    // function updateEmp() {
    //     inquirer.prompt([
    //         {
    //             type: 'list',
    //             message: 'Which employee would you like to modify?',
    //             choices: getEmps(),
    //             name: 'chooseEmp',
    //         },
    //         {
    //             type: 'list',
    //             message: "Enter the employee's new role",
    //             choices: getRoles(),
    //             name: 'empRole',
    //         }
    //     ])
    //     .then((answers) => {
    //         changeEmp(answers);
    //     })
    // },
    // function terminate() {
    //     console.log('Closing application...');
    // },
// ];

// function getDepts() {
//     db.query(`SELECT * FROM department;`, (err, results) => {
//         // return [1,2,3]
//         var roleReturn = results.map(({ id, name }) => ({ id: id, name: name }));
//         console.log(roleReturn);
//         return roleReturn;
//         // deptsArr = [];
//         // for (const role of roleReturn) {
//         //     deptsArr.push(`${role.id}:${role.name}`);
//         // }
//         // functArr[2]();
//         // });
//         // }
//     })
// };