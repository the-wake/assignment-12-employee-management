const mysql = require('mysql2');
const inquirer = require('inquirer');

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
            functArr[2]();
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
                name: 'newEntry',
            },
        )
        .then((answers) => {
            newDept(answers);
        })
    },
    function addRole() {
        inquirer.prompt(
            {
                type: 'input',
                message: `What is the name of the role?`,
                name: 'newEntry',
            }
        )
    },
    function addEmp() {
        inquirer.prompt(
            {
                type: 'input',
                message: `What is the employee's name?`,
                name: 'newEntry',
            }
        )
    },
    function updateEmp() {
        console.log('Updating an Employee Role.');
    },
    function terminate() {
        console.log('Closing application...');
    },
];

function newDept(data) {
    db.query(`INSERT INTO department VALUES (?)`, data)
    // renderTable('department');
};

function renderTable(table) {
    db.query(`SELECT * FROM ??`, table, (err, results) => {
        if (err) {
            console.error(err);
        }
        console.log(results);
    })
};

function init() {
    inquirer.prompt(optionsArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

init();
