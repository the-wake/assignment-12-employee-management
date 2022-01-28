const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = require('express');
const util = require('util');

const { newPrompt } = require('./lib/inquiries.js');
const { getRoles, getDepts, getEmps } = require('./lib/query-render.js');

function init(prompt) {
    getDepts();
    getRoles();
    getEmps();
    prompt();
}

init(newPrompt);
