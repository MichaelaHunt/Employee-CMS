import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

class dbServices {
    GetDepartmentTable() {
        pool.query('SELECT * FROM department', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                return result.rows;
            }
        });
    }

    GetRoleTable() {
        pool.query('SELECT * FROM role', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                return result.rows;
            }
        });
    }

    GetEmployeeTable() {
        pool.query('SELECT * FROM employee', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                return result.rows;
            }
        });
    }

    AddDepartment() {

    }

    AddRole() {

    }

    AddEmployee() {

    }

    UpdateEmployee() {

    }
}

export default dbServices;