"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var pg = require("pg");
var asciiArt = "\n  _____       _       _____      _ _       \n |  __ \\     | |     / ____|    | | |      \n | |__) |___ | | ___| |     __ _| | |      \n |  _  // _ \\| |/ _ \\ |    / _` | | |      \n | | \\ \\ (_) | |  __/ |___| (_| | | |      \n |_|  \\_\\___/|_|\\___|\\_____\\__,_|_|_|      \n |  \\/  |                                  \n | \\  / | __ _ _ __   __ _  __ _  ___ _ __ \n | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|\n | |  | | (_| | | | | (_| | (_| |  __/ |   \n |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|   \n                            __/ |          \n                           |___/           \n";
var pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employees_db',
    password: 'your_password',
    port: 5432,
});
function viewAllEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = "\n      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, \n             (SELECT CONCAT(m.first_name, ' ', m.last_name) \n              FROM employee m WHERE m.id = e.manager_id) AS manager\n      FROM employee e\n      JOIN role r ON e.role_id = r.id\n      JOIN department d ON r.department_id = d.id;\n    ";
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    result = _a.sent();
                    // Display result in table form
                    console.table(result.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching employees:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function viewAllDepartments() {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query('SELECT * FROM department;')];
                case 1:
                    result = _a.sent();
                    // Display result in table form
                    console.table(result.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching departments:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function viewAllRoles() {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query('SELECT * FROM role;')];
                case 1:
                    result = _a.sent();
                    console.table(result.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error fetching roles:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addDepartment() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, query, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the name of the department?',
                        },
                    ])];
                case 1:
                    answer = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
                    return [4 /*yield*/, pool.query(query, [answer.departmentName])];
                case 3:
                    result = _a.sent();
                    console.log("Added department: ".concat(result.rows[0].name));
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error adding department:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function addRole() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, departmentResult, departments, departmentAnswer, query, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the name of the role?',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary of the role?',
                            validate: function (value) {
                                var parsedValue = parseFloat(value);
                                return !isNaN(parsedValue) ? true : 'Please enter a valid number for salary';
                            }
                        },
                    ])];
                case 1:
                    answers = _a.sent();
                    return [4 /*yield*/, pool.query('SELECT * FROM department;')];
                case 2:
                    departmentResult = _a.sent();
                    departments = departmentResult.rows.map(function (row) { return ({
                        name: row.name,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Which department does the role belong to?',
                                choices: departments,
                            },
                        ])];
                case 3:
                    departmentAnswer = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
                    return [4 /*yield*/, pool.query(query, [
                            answers.roleName,
                            parseFloat(answers.salary),
                            departmentAnswer.departmentId,
                        ])];
                case 5:
                    result = _a.sent();
                    console.log("Added role: ".concat(result.rows[0].title));
                    return [3 /*break*/, 7];
                case 6:
                    error_5 = _a.sent();
                    console.error('Error adding role:', error_5);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function addEmployee() {
    return __awaiter(this, void 0, void 0, function () {
        var employeeAnswers, roleResult, roles, roleAnswer, managerResult, managers, managerAnswer, managerId, query, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "What is the employee's first name?",
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "What is the employee's last name?",
                        },
                    ])];
                case 1:
                    employeeAnswers = _a.sent();
                    return [4 /*yield*/, pool.query('SELECT * FROM role;')];
                case 2:
                    roleResult = _a.sent();
                    roles = roleResult.rows.map(function (row) { return ({
                        name: row.title,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: "What is the employee's role?",
                                choices: roles,
                            },
                        ])];
                case 3:
                    roleAnswer = _a.sent();
                    return [4 /*yield*/, pool.query('SELECT * FROM employee;')];
                case 4:
                    managerResult = _a.sent();
                    managers = managerResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); }) || [];
                    managers.unshift({ name: 'None', value: -1 });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'managerId',
                                message: "Who is the employee's manager?",
                                choices: managers,
                            },
                        ])];
                case 5:
                    managerAnswer = _a.sent();
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    managerId = managerAnswer.managerId === -1 ? null : managerAnswer.managerId;
                    query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
                    return [4 /*yield*/, pool.query(query, [
                            employeeAnswers.firstName,
                            employeeAnswers.lastName,
                            roleAnswer.roleId,
                            managerId, // Use the modified managerId (null if "None" was selected)
                        ])];
                case 7:
                    result = _a.sent();
                    console.log("Added employee: ".concat(result.rows[0].first_name, " ").concat(result.rows[0].last_name));
                    return [3 /*break*/, 9];
                case 8:
                    error_6 = _a.sent();
                    console.error('Error adding employee:', error_6);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function updateEmployeeRole() {
    return __awaiter(this, void 0, void 0, function () {
        var employeeResult, employees, employeeAnswer, roleResult, roles, roleAnswer, query, result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM employee;')];
                case 1:
                    employeeResult = _a.sent();
                    employees = employeeResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'employeeId',
                                message: "Which employee's role do you want to update?",
                                choices: employees,
                            },
                        ])];
                case 2:
                    employeeAnswer = _a.sent();
                    return [4 /*yield*/, pool.query('SELECT * FROM role;')];
                case 3:
                    roleResult = _a.sent();
                    roles = roleResult.rows.map(function (row) { return ({
                        name: row.title,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: "Which role do you want to assign to the selected employee?",
                                choices: roles,
                            },
                        ])];
                case 4:
                    roleAnswer = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
                    return [4 /*yield*/, pool.query(query, [roleAnswer.roleId, employeeAnswer.employeeId])];
                case 6:
                    result = _a.sent();
                    console.log("Updated employee: ".concat(result.rows[0].first_name, " ").concat(result.rows[0].last_name, "'s role"));
                    return [3 /*break*/, 8];
                case 7:
                    error_7 = _a.sent();
                    console.error('Error updating employee role:', error_7);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function updateEmployeeManager() {
    return __awaiter(this, void 0, void 0, function () {
        var employeeResult, employees, employeeAnswer, managerResult, managers, managerAnswer, managerId, query, result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM employee;')];
                case 1:
                    employeeResult = _a.sent();
                    employees = employeeResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'employeeId',
                                message: "Which employee's manager do you want to update?",
                                choices: employees,
                            },
                        ])];
                case 2:
                    employeeAnswer = _a.sent();
                    return [4 /*yield*/, pool.query('SELECT * FROM employee;')];
                case 3:
                    managerResult = _a.sent();
                    managers = managerResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); });
                    managers.unshift({ name: 'None', value: -1 });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'managerId',
                                message: "Who is the employee's new manager?",
                                choices: managers,
                            },
                        ])];
                case 4:
                    managerAnswer = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    managerId = managerAnswer.managerId === -1 ? null : managerAnswer.managerId;
                    query = 'UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *';
                    return [4 /*yield*/, pool.query(query, [managerId, employeeAnswer.employeeId])];
                case 6:
                    result = _a.sent();
                    console.log("Updated manager for: ".concat(result.rows[0].first_name, " ").concat(result.rows[0].last_name));
                    return [3 /*break*/, 8];
                case 7:
                    error_8 = _a.sent();
                    console.error('Error updating manager:', error_8);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function viewEmployeesByManager() {
    return __awaiter(this, void 0, void 0, function () {
        var managerResult, managers, managerAnswer, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL);')];
                case 1:
                    managerResult = _a.sent();
                    managers = managerResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'managerId',
                                message: 'Select a manager to view their employees:',
                                choices: managers,
                            },
                        ])];
                case 2:
                    managerAnswer = _a.sent();
                    query = 'SELECT * FROM employee WHERE manager_id = $1';
                    return [4 /*yield*/, pool.query(query, [managerAnswer.managerId])];
                case 3:
                    result = _a.sent();
                    console.table(result.rows);
                    return [2 /*return*/];
            }
        });
    });
}
function viewEmployeesByDepartment() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentResult, departments, departmentAnswer, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM department;')];
                case 1:
                    departmentResult = _a.sent();
                    departments = departmentResult.rows.map(function (row) { return ({
                        name: row.name,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Select a department to view its employees:',
                                choices: departments,
                            },
                        ])];
                case 2:
                    departmentAnswer = _a.sent();
                    query = "\n      SELECT e.first_name, e.last_name, r.title \n      FROM employee e\n      JOIN role r ON e.role_id = r.id\n      WHERE r.department_id = $1\n    ";
                    return [4 /*yield*/, pool.query(query, [departmentAnswer.departmentId])];
                case 3:
                    result = _a.sent();
                    console.table(result.rows);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteDepartment() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentResult, departments, departmentAnswer, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM department;')];
                case 1:
                    departmentResult = _a.sent();
                    departments = departmentResult.rows.map(function (row) { return ({
                        name: row.name,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Which department do you want to delete?',
                                choices: departments,
                            },
                        ])];
                case 2:
                    departmentAnswer = _a.sent();
                    query = 'DELETE FROM department WHERE id = $1';
                    return [4 /*yield*/, pool.query(query, [departmentAnswer.departmentId])];
                case 3:
                    _a.sent();
                    console.log('Department deleted successfully.');
                    return [2 /*return*/];
            }
        });
    });
}
function deleteRole() {
    return __awaiter(this, void 0, void 0, function () {
        var roleResult, roles, roleAnswer, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM role;')];
                case 1:
                    roleResult = _a.sent();
                    roles = roleResult.rows.map(function (row) { return ({
                        name: row.title,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'Which role do you want to delete?',
                                choices: roles,
                            },
                        ])];
                case 2:
                    roleAnswer = _a.sent();
                    query = 'DELETE FROM role WHERE id = $1';
                    return [4 /*yield*/, pool.query(query, [roleAnswer.roleId])];
                case 3:
                    _a.sent();
                    console.log('Role deleted successfully.');
                    return [2 /*return*/];
            }
        });
    });
}
function deleteEmployee() {
    return __awaiter(this, void 0, void 0, function () {
        var employeeResult, employees, employeeAnswer, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM employee;')];
                case 1:
                    employeeResult = _a.sent();
                    employees = employeeResult.rows.map(function (row) { return ({
                        name: "".concat(row.first_name, " ").concat(row.last_name),
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'employeeId',
                                message: 'Which employee do you want to delete?',
                                choices: employees,
                            },
                        ])];
                case 2:
                    employeeAnswer = _a.sent();
                    query = 'DELETE FROM employee WHERE id = $1';
                    return [4 /*yield*/, pool.query(query, [employeeAnswer.employeeId])];
                case 3:
                    _a.sent();
                    console.log('Employee deleted successfully.');
                    return [2 /*return*/];
            }
        });
    });
}
function viewDepartmentBudget() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentResult, departments, departmentAnswer, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query('SELECT * FROM department;')];
                case 1:
                    departmentResult = _a.sent();
                    departments = departmentResult.rows.map(function (row) { return ({
                        name: row.name,
                        value: row.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Select a department to view its total utilized budget:',
                                choices: departments,
                            },
                        ])];
                case 2:
                    departmentAnswer = _a.sent();
                    query = "\n      SELECT SUM(r.salary) AS total_budget\n      FROM employee e\n      JOIN role r ON e.role_id = r.id\n      WHERE r.department_id = $1\n    ";
                    return [4 /*yield*/, pool.query(query, [departmentAnswer.departmentId])];
                case 3:
                    result = _a.sent();
                    console.log("Total Utilized Budget: $".concat(result.rows[0].total_budget));
                    return [2 /*return*/];
            }
        });
    });
}
function showMainMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'What would you like to do?',
                            choices: [
                                'View All Employees',
                                'Add Employee',
                                'Delete Employee',
                                'Update Employee Manager',
                                'View Employees By Manager',
                                'View All Roles',
                                'Add Role',
                                'Update Employee Role',
                                'Delete Role',
                                'View All Departments',
                                'Add Department',
                                'View Employees By Department',
                                'Delete Department',
                                'View Department Budget',
                                'Exit',
                            ],
                        },
                    ])];
                case 1:
                    answer = _b.sent();
                    _a = answer.action;
                    switch (_a) {
                        case 'View All Employees': return [3 /*break*/, 2];
                        case 'Add Employee': return [3 /*break*/, 4];
                        case 'Delete Employee': return [3 /*break*/, 6];
                        case 'Update Employee Manager': return [3 /*break*/, 8];
                        case 'View Employees By Manager': return [3 /*break*/, 10];
                        case 'View All Roles': return [3 /*break*/, 12];
                        case 'Add Role': return [3 /*break*/, 14];
                        case 'Update Employee Role': return [3 /*break*/, 16];
                        case 'Delete Role': return [3 /*break*/, 18];
                        case 'View All Departments': return [3 /*break*/, 20];
                        case 'Add Department': return [3 /*break*/, 22];
                        case 'View Employees By Department': return [3 /*break*/, 24];
                        case 'Delete Department': return [3 /*break*/, 26];
                        case 'View Department Budget': return [3 /*break*/, 28];
                        case 'Exit': return [3 /*break*/, 30];
                    }
                    return [3 /*break*/, 32];
                case 2:
                    console.log('Displaying all employees...');
                    return [4 /*yield*/, viewAllEmployees()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 4:
                    console.log('Add a new employee...');
                    return [4 /*yield*/, addEmployee()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 6:
                    console.log('Deleting employee...');
                    return [4 /*yield*/, deleteEmployee()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 8:
                    console.log('Updating employee manager...');
                    return [4 /*yield*/, updateEmployeeManager()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 10:
                    console.log('Displaying employees by manager...');
                    return [4 /*yield*/, viewEmployeesByManager()];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 12:
                    console.log('Displaying all roles...');
                    return [4 /*yield*/, viewAllRoles()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 14:
                    console.log('Add a new role...');
                    return [4 /*yield*/, addRole()];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 16:
                    console.log('Updating employee role...');
                    return [4 /*yield*/, updateEmployeeRole()];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 18:
                    console.log('Deleting role...');
                    return [4 /*yield*/, deleteRole()];
                case 19:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 20:
                    console.log('Displaying all departments...');
                    return [4 /*yield*/, viewAllDepartments()];
                case 21:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 22:
                    console.log('Add a new department...');
                    return [4 /*yield*/, addDepartment()];
                case 23:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 24:
                    console.log('Viewing employees by department...');
                    return [4 /*yield*/, viewEmployeesByDepartment()];
                case 25:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 26:
                    console.log('Deleting department...');
                    return [4 /*yield*/, deleteDepartment()];
                case 27:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 28:
                    console.log('Viewing department budget...');
                    return [4 /*yield*/, viewDepartmentBudget()];
                case 29:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 30:
                    console.log('Exiting...');
                    return [4 /*yield*/, pool.end()];
                case 31:
                    _b.sent(); // Close PostgreSQL connection on exit
                    process.exit();
                    return [3 /*break*/, 33];
                case 32:
                    console.log('Invalid action');
                    _b.label = 33;
                case 33: 
                // Display the menu again after the action is completed (except for Exit)
                return [4 /*yield*/, showMainMenu()];
                case 34:
                    // Display the menu again after the action is completed (except for Exit)
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function startApp() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear(); // Clear the console for a clean look
                    console.log(asciiArt); // Show ASCII art only once at the start
                    return [4 /*yield*/, showMainMenu()];
                case 1:
                    _a.sent(); // Start the main menu after the ASCII art
                    return [2 /*return*/];
            }
        });
    });
}
// Run the startApp function to start the program
startApp();
