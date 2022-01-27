// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// const app = require('express');
// const cTable = require('console.table');

// const optionArr = require('./lib/questions.js');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'RootRoot',
//         database: 'a12_Staff'
//     },
// );

// var fakeArr = ['1:Midrange', '2:Aggressive', '3:foo', '4:foo',];
// var deptsArr = ['1:foo', '1:food', '1:foods'];
// var rolesArr = ['1:foo', '1:food', '1:foods'];
// var empArr = ['1:foo', '1:food', '1:foods'];

// function optionSwitch(choice) {
//     switch (choice) {
//         case 'View All Departments':
//             functArr[0]('department');
//             break;
//         case 'View All Roles':
//             functArr[0]('role');
//             break;
//         case 'View All Employees':
//             functArr[0]('employee');
//             break;
//         case 'Add a Department':
//             functArr[1]();
//             break;
//         case 'Add a Role':
//             functArr[2]();
//             break;
//         case 'Add an Employee':
//             functArr[3]();
//             break;
//         case 'Update an Employee Role':
//             functArr[4]();
//             break;
//         case 'Terminate Application':
//             functArr[5]();
//             break;
//     }
// };

// const functArr = [
//     function viewEl(choice) {
//         console.log(`Viewing table "${choice}"`);
//         db.query(`SELECT * FROM ??`, choice, (err, results) => {
//             if (err) {
//                 console.error(err);
//             }
//             console.table(results);
//         })
//     },
//     function addDept() {
//         inquirer.prompt(
//             {
//                 type: 'input',
//                 message: `What is the name of the department?`,
//                 name: 'deptName',
//             },
//         )
//         .then((answers) => {
//             newDept(answers);
//         })
//     },
    
//     function addRole() {
//         // const validDepts = await getDepts()
//         // console.log(validDepts)
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 message: `What is the name of the role?`,
//                 name: 'roleName',
//             },
//             {
//                 type: 'number',
//                 message: `What is the salary for this role?`,
//                 name: 'roleSal',
//             },
//             {
//                 type: 'list',
//                 message: `What department does this role fall under?`,
//                 choices: getDepts('data'),
//                 name: 'roleDept',
//             },
//         ])
//         .then((answers) => {
//             newRole(answers)
//         });
//         // .then((answers) => {
//         //     newRole(answers);
//         //     // console.log(answers);
//         // })
//     },
//     function addEmp() {
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 message: `What is this employee's first name?`,
//                 name: 'firstName',
//             },
//             {
//                 type: 'input',
//                 message: `What is this employee's last name?`,
//                 name: 'lastName',
//             },
//             {
//                 type: 'list',
//                 message: `What is this employee's role?`,
//                 choices: rolesArr,
//                 name: 'empRole',
//             },
//             {
//                 type: 'list',
//                 message: `Who is this employee's manager?`,
//                 choices: empArr,
//                 name: 'empMngr',
//             },
//         ])
//         .then((answers) => {
//             newEmp(answers)
//         })
//     },
//     function updateEmp() {
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 message: 'Which employee would you like to modify?',
//                 choices: empArr,
//                 name: 'chooseEmp',
//             },
//             {
//                 type: 'list',
//                 message: "Enter the employee's new role",
//                 choices: rolesArr,
//                 name: 'empRole',
//             }
//         ])
//         .then((answers) => {
//             changeEmp(answers);
//         })
//     },
//     function terminate() {
//         console.log('Closing application...');
//     },
// ];

// function getDepts() {
//     // return [1,2,3]
//     db.query(`SELECT * FROM department;`, async (err, results) => {
//         var roleReturn = await results.map(({ id, name }) => ({ id: id, name: name }));
//         // console.log(roleReturn);
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

// function newDept(data) {
//     let deptVar = data.deptName;
//     db.query(`INSERT INTO department (name) VALUES (?);`, deptVar)
//     renderTable('department');
// };

// function newRole(data) {
//     // console.log(data);
//     let { roleName, roleSal, roleDept } = data;
//     console.log(roleDept);
//     roleDept = roleDept.split(':')[0];
//     db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleName, roleSal, roleDept]);
//     renderTable('role');
// };

// function newEmp(data) {
//     let { firstName, lastName, empRole, empMngr } = data;
//     db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, empRole, empMngr]);
//     renderTable('employee');
// };

// // Need to make sure this one works.
// function changeEmp(data) {
//     let { chooseEmp, empRole} = data;
//     chooseEmp = empRole.split(':')[0];
//     empRole = empRole.split(':')[0];
//     db.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`, [empRole, chooseEmp]);
//     renderTable('employee');
// };

// function renderTable(table) {
//     db.query(`SELECT * FROM ??;`, table, (err, results) => {
//         if (err) {
//             console.error(err);
//         }
//         console.table(results);
//     })
// };

// function init() {
//     inquirer.prompt(optionArr)
//     .then((answers) => {
//         optionSwitch(answers.optionSelect);
//     })
// };

// init();
// // getDepts();