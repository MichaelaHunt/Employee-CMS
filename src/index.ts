import inquirer from "inquirer";
import dbServices from './dbServices';

const dbService = new dbServices();

const actionOptions = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee's role"
];

function init() {
    inquirer.prompt([{
        type: 'list',
        message: "questions[4]",
        name: 'action',
        choices: actionOptions
    }]).then((response: any) => performActions(response));
}

function performActions(response: any) {
    let rows;
    switch (response.action) {
        case "View all departments":
            rows = dbService.GetDepartmentTable();
            console.table(rows);
            break;
        case "View all roles":
            rows = dbService.GetRoleTable();
            console.table(rows);
            break;
        case "View all employees":
            rows = dbService.GetEmployeeTable();
            console.table(rows);
            break;
        case "Add a department":
            //do an inquirer to get the info you need
            //then do an add
            break;
        case "Add a role":
            break;
        case "Add an employee":
            break;
        case "Update an employee's role":
            break;
    }
}

function handleDepartmentAddition() {//only need name
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the name of the new department.",
            name: 'name'
        }
    ]).then();
}

function handleRoleAddition() {//need title, salary, and department_id
    //grab the current departments
    let rows = dbService.GetDepartmentTable();//I'm aware I can just do a "SELECT name FROM department" but I don't feel like it
    //format them into an array of just the names
    let list = rows.map((item) => item.name);
    list.push("None");
    //ask de questions
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the title of the new role.",
            name: 'title'
        }, 
        {
            type: 'input',
            message: "Please enter the salary of the new role.",
            name: 'salary'
        },
        {
            type: 'list',
            message: "Please select the department this role will belong to.",
            name: 'department',
            options: list
        }
    ]).then();
}

function handleEmployeeAddition() {//need first name, last name, role_id, and manager_id.
    inquirer.prompt([
        {

        }
    ]).then();
}

init();