const inquirer = require('inquirer');
const cTable = require('console.table');

const db = require('./db.js')
const { getDepts, getRoles, getEmps, newDept, newRole, newEmp, changeEmp } = require('./query-render.js');

const optionArr = [
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role',],
        name: 'optionSelect',
    },
];

function optionSwitch(choice) {
    switch (choice) {
        case 'View All Departments':
            renderDepts();
            break;
        case 'View All Roles':
            renderRoles();
            break;
        case 'View All Employees':
            renderEmps();
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
    }
};

function renderDepts() {
    db.query(`SELECT * FROM department;`, (err, results) => {
        if (err) {
            console.error(err);
            goNext();
        }
        console.table(results);
        goNext();
    })
};

function renderRoles() {
    db.query(`SELECT * FROM role INNER JOIN department ON role.department_id=department.id;`,
    (err, results) => {
        if (err) {
            console.error(err);
            goNext();
        }
        console.table(results);
        goNext();
    })
};

function renderEmps() {
    db.query(`SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id;`, (err, results) => {
        if (err) {
            console.error(err);
            goNext();
        }
        console.table(results);
        goNext();
    })
};

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
        getDepts();
        goNext();
    })
};

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
            choices: deptsReturn,
            name: 'roleDept',
        },
    ])
    .then((answers) => {
        newRole(answers);
        getRoles();
        goNext();
    });
};

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
            choices: rolesReturn,
            name: 'empRole',
        },
        {
            type: 'list',
            message: `Who is this employee's manager?`,
            choices: empsReturn,
            name: 'empMngr',
        },
    ])
    .then((answers) => {
        newEmp(answers);
        getEmps();
        goNext();
    });
};

function updateEmp() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to modify?',
            choices: empsReturn,
            name: 'chooseEmp',
        },
        {
            type: 'list',
            message: "Enter the employee's new role",
            choices: rolesReturn,
            name: 'empRole',
        },
    ])
    .then((answers) => {
        changeEmp(answers);
        getEmps();        
        goNext();
    });
};

function newPrompt() {
    inquirer.prompt(optionArr)
    .then((answers) => {
        optionSwitch(answers.optionSelect);
    })
};

function goNext() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Add, View, or Update Data', 'Exit Application'],
            name: 'goNext',
        },
    )
    .then((choice) => {
        switch (choice.goNext) {
            case 'Add, View, or Update Data':
                newPrompt();
                break;
            case 'Exit Application':
                console.log('Thank you for using our humble manager program!');
                process.exit(0);
        }
    })
};

module.exports = { newPrompt, goNext, addDept, addRole, addEmp, updateEmp };
