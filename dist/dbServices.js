import { pool, connectToDb } from './connection.js';
await connectToDb();
class dbServices {
    async GetDepartmentTable() {
        try {
            const result = await pool.query('SELECT * FROM department');
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async GetRoleTable() {
        try {
            const result = await pool.query('SELECT * FROM role');
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async GetEmployeeTable() {
        try {
            const result = await pool.query('SELECT * FROM employee');
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async AddDepartment(name) {
        const params = [name];
        try {
            await pool.query('INSERT INTO department (name) VALUES ($1)', params, (err, _result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
    async AddRole(title, salary, department_id) {
        const params = [title, salary, department_id];
        try {
            await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', params, (err, _result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
    async AddEmployee(firstName, lastName, roleId, managerId) {
        const params = [firstName, lastName, roleId, managerId];
        try {
            await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', params, (err, _result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
    async UpdateEmployee(roleId, employeeId) {
        const params = [roleId, employeeId];
        try {
            await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', params, (err, _result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
}
export default dbServices;
