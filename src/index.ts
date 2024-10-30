import inquirer from "inquirer";
import dbServices from './dbServices.js';

const dbService = new dbServices();

const actionOptions = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee's role",
    "Exit"
];

function init() {
    inquirer.prompt([{
        type: 'list',
        message: "What would you like to do?",
        name: 'action',
        choices: actionOptions
    }]).then((response: any) => performActions(response));
}

async function performActions(response: any) {
    let rows;
    switch (response.action) {
        case "View all departments":
            rows = await dbService.GetDepartmentTable();
            console.table(rows);
            break;
        case "View all roles":
            rows = await dbService.GetRoleTable();
            console.table(rows);
            break;
        case "View all employees":
            rows = await dbService.GetEmployeeTable();
            console.table(rows);
            break;
        case "Add a department":
            //do an inquirer to get the info you need
            let name = await handleDepartmentAddition();
            //then do an add
            try {
                await dbService.AddDepartment(name);
            } catch (err) {
                console.log("ERROR: " + err);
            }
            break;
        case "Add a role":
            let { title, salary, departmentId } = await handleRoleAddition();
            try {
                await dbService.AddRole(title, salary, departmentId);
            } catch (err) {
                console.log("ERROR: " + err);
            }
            break;
        case "Add an employee":
            let { firstName, lastName, roleId, managerId } = await handleEmployeeAddition();
            try {
                await dbService.AddEmployee(firstName, lastName, roleId, managerId);
            } catch (err) {
                console.log("ERROR: " + err);
            }
            break;
        case "Update an employee's role":
            let { role_Id, employeeId } = await handleEmployeeRoleChange();
            try {
                await dbService.UpdateEmployee(role_Id, employeeId);
            } catch (err) {
                console.log("ERROR: " + err);
            }
            break;
    }
    if (response.action != "Exit") {
        init();
    }
}

async function handleDepartmentAddition() {//only need name
    let name = '';//this is the issue
    await inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the name of the new department.",
            name: 'name'
        }
    ]).then((response) => name = response.name);
    return name;
}

async function handleRoleAddition() {//need title, salary, and department_id
    //grab the current departments
    let rows = await dbService.GetDepartmentTable();//I'm aware I can just do a "SELECT name FROM department" but I don't feel like it
    //format them into an array of just the names
    let list = rows!.map((item) => item.name as string);
    list.push("None");
    //ask de questions
    let departmentId = 0;
    let title = '';
    let salary = 0;
    await inquirer.prompt([
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
            choices: list
        }
    ]).then((response) => {
        console.log("Entered the then clause");
        for (let item of rows!) {//so these loops are to grab the id from the list names
            if (response.department === item.name) {
                console.log("Response.department is: " + response.department);
                departmentId = item.id;
            }
        }
        title = response.title;
        salary = response.salary;
    });

    return { title, salary, departmentId };
}

async function handleEmployeeAddition() {//need first name, last name, role_id, and manager_id.
    let roleRows = await dbService.GetRoleTable();
    let managerRows = await dbService.GetEmployeeTable();
    //format them into an array of just the names
    let roles = roleRows!.map((item) => item.title);
    let managers = managerRows!.map((item) => `${item.first_name} ${item.last_name}`);

    let firstName = '';
    let lastName = '';
    let roleId = 0;
    let managerId = 0;
    await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the employee's first name.",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Enter the employee's last name",
            name: 'lastName'
        },
        {
            type: 'list',
            message: "Select the role of the new employee.",
            name: 'role',
            choices: roles
        },
        {
            type: 'list',
            message: "Select the manager of the new employee.",
            name: 'manager',
            choices: managers
        }
    ]).then((response) => {
        for (let item of roleRows!) {
            if (response.role === item.title) {
                roleId = item.id;
            }
        }
        for (let item of managerRows!) {
            if (response.manager === `${item.first_name} ${item.last_name}`) {
                managerId = item.id;
            }
        }
        firstName = response.firstName;
        lastName = response.lastName;
    });
    return { firstName, lastName, roleId, managerId };
}

async function handleEmployeeRoleChange() {
    let roleRows = await dbService.GetRoleTable();
    let employeeRows = await dbService.GetEmployeeTable();
    let employeeId = 0;
    let role_Id = 0;
    //get the titles only
    let roles = roleRows!.map((item) => item.title);
    let employees = employeeRows!.map((item) => `${item.first_name} ${item.last_name}`);
    await inquirer.prompt([
        {
            type: 'list',
            message: "Whose role are you updating?",
            name: 'employee',
            choices: employees
        },
        {
            type: 'list',
            message: "What is their new role?",
            name: 'role',
            choices: roles
        }
    ]).then((response) => {
        for (let item of roleRows!) {
            if (response.role === item.title) {
                role_Id = item.id;
            }
        }
        for (let item of employeeRows!) {
            if (response.employee === `${item.first_name} ${item.last_name}`) {
                employeeId = item.id;
            }
        }
    });
    return { role_Id, employeeId };
}

init();