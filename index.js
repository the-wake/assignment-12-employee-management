const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'RootRoot',
        database: 'a12_Staff'
    },
);

const optionsArr = [
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Terminate Application',],
        name: 'optionSelect',
    },
];

var fakeArr = [1, 2, 3, 4, 5,];
var deptsArr = [];
var rolesArr = [];
var mngrArr = [];

function optionSwitch(choice) {
    switch (choice) {
        case 'View All Departments':
            functArr[0]('department');
            break;
        case 'View All Roles':
            functArr[0]('role');
            break;
        case 'View All Employees':
            functArr[0]('employee');
            break;
        case 'Add a Department':
            functArr[1]();
            break;
        case 'Add a Role':
            getDepts();
            break;
        case 'Add an Employee':
            functArr[3]();
            break;
        case 'Update an Employee Role':
            functArr[4]();
            break;
        case 'Terminate Application':
            functArr[5]();
            break;
    }
};

const functArr = [
    function viewEl(choice) {
        console.log(`Viewing table "${choice}"`);
        db.query(`SELECT * FROM ??`, choice, (err, results) => {
            if (err) {
                console.error(err);
            }
            console.log(results);
        })
    },
    function addDept() {
        inquirer.prompt(
            {
                type: 'input',
                message: `What is the name of the department?`,
                name: 'deptName',
            },
        )
        .then((answers) => {
            newDept(answers);
        })
    },
    function addRole() {
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
            newRole(answers);
            // console.log(answers);
        })
    },
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
                type: 'input',
                message: `What is this employee's role?`,
                name: 'empRole',
            },
            {
                type: 'input',
                message: `Who is this employee's manager?`,
                name: 'empMngr',
            },
        ])
        .then((answers) => {
            newEmp(answers)
        })
    },
    function updateEmp() {
        console.log('Updating an Employee Role.');
    },
    function terminate() {
        console.log('Closing application...');
    },
];

function getDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            deptsArr = [];
            var roleReturn = results;
            for (const role of roleReturn) {
                deptsArr.push(`${role.id}:${role.name}`);
                // console.log(deptsArr);
            }
            functArr[2]();
        }
    });
};

function newDept(data) {
    let deptVar = data.deptName;
    db.query(`INSERT INTO department (name) VALUES (?);`, deptVar)
    renderTable('department');
};

function newRole(data) {
    // console.log(data);
    let { roleName, roleSal, roleDept } = data;
    roleDept = roleDept.split(":")[0];
    console.log(roleDept);
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleName, roleSal, roleDept]);
    renderTable('role');
};

function newEmp(data) {
    let { firstName, lastName, empRole, empMngr } = data;
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, empRole, empMngr]);
    renderTable('role');
};

function renderTable(table) {
    db.query(`SELECT * FROM ??;`, table, (err, results) => {
        if (err) {
            console.error(err);
        }
        console.table(results);
    })
};

function init() {
    inquirer.prompt(optionsArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

init();
// renderTable('employee');
