const mysql = require('mysql2');
const inquirer = require('inquirer');

const optionsArr = [
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Terminate Application',],
        name: 'optionSelect',
    },
];

const functArr = [
    function viewDepts(table) {
        console.log('Viewing Departments.');
        inquirer.prompt(
            {
                type: 'input',
                message: `What is the name of the ${table}?`,
                name: 'newEntry',
            }
        );
        db.query(` `)
    },
    function viewRoles() {
        console.log('Viewing Roles.');
    },
    function viewEmployees() {
        console.log('Viewing Employees.');
    },
    function addDept() {
        console.log('Adding a Department.');
    },    
    function addRole() {
        console.log('Adding a Role.');
    },    
    function addEmployee() {
        console.log('Adding a Employee.');
    },    
    function updateEmp() {
        console.log('Updating an Employee Role.');
    },
    function terminate() {
        console.log('Closing application...');
    },
];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'RootRoot',
        database: 'a12_Staff'
    },
);



function optionSwitch(choice) {
    switch (choice) {
        case 'View All Departments':
            functArr[0]('Departments');
            break;
        case 'View All Roles':
            functArr[1]();
            break;
        case 'View All Employees':
            functArr[2]();
            break;
        case 'Add a Department':
            functArr[3]();
            break;
        case 'Add a Role':
            functArr[4]();
            break;
        case 'Add an Employee':
            functArr[5]();
            break;
        case 'Update an Employee Role':
            functArr[6]();
            break;
        case 'Terminate Application':
            functArr[7]();
            break;
    }
};

function init() {
    inquirer.prompt(optionsArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

init();
