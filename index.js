const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = require('express');
const cTable = require('console.table');

const db = require('./lib/db.js')
const { addDept, addRole, addEmp, updateEmp, terminate } = require('./lib/inquiries.js');
const { setArr } = require('./lib/query-render.js');
var { fakeArr, deptsArr, rolesArr, mngrsArr } = require('./lib/data.js')

const optionArr = [
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Terminate Application',],
        name: 'optionSelect',
    },
];

function optionSwitch(choice) {
    console.log(deptsArr);
    switch (choice) {
        case 'View All Departments':
            viewEl('department');
            break;
        case 'View All Roles':
            viewEl('role');
            break;
        case 'View All Employees':
            viewEl('employee');
            break;
        case 'Add a Department':    
            addDept();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmp();
            break;
        case 'Update an Employee Role':
            updateEmp();
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
};

function init() {
    setArr('deptsArr');
    setArr('rolesArr');
    setArr('mngrsArr');
    console.log(deptsArr);
    inquirer.prompt(
        {
            type: 'confirm',
            message: 'Welcome! Would you like to run the team builder?',
            name: 'initialize',
        }
    )
    .then((init) => {
        if (init.initialize) {
            console.log('All right! Let\'s get started!')
            newPrompt();
        } else {
            console.log('Have a nice day!')
            process.exit();
        }
    })
};

function newPrompt() {
    inquirer.prompt(optionArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

init();
// setArr('deptsArr');

// addRole();

module.exports = optionArr;

// TODO:
// • Render results with console.table.
// • Clear database.
// • README and walkthrough video.





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