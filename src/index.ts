import inquirer from 'inquirer';
import * as pg from 'pg';

const asciiArt = `
  _____       _       _____      _ _       
 |  __ \\     | |     / ____|    | | |      
 | |__) |___ | | ___| |     __ _| | |      
 |  _  // _ \\| |/ _ \\ |    / _\` | | |      
 | | \\ \\ (_) | |  __/ |___| (_| | | |      
 |_|  \\_\\___/|_|\\___|\\_____\\__,_|_|_|      
 |  \\/  |                                  
 | \\  / | __ _ _ __   __ _  __ _  ___ _ __ 
 | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|
 | |  | | (_| | | | | (_| | (_| |  __/ |   
 |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|   
                            __/ |          
                           |___/           
`;


const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employees_db',
  password: 'your_password',
  port: 5432,
});

async function viewAllEmployees() {
  try {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
             (SELECT CONCAT(m.first_name, ' ', m.last_name) 
              FROM employee m WHERE m.id = e.manager_id) AS manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id;
    `;

    const result = await pool.query(query);

    // Display result in table form
    console.table(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

async function viewAllDepartments() {
  try {
    const result = await pool.query('SELECT * FROM department;');

    // Display result in table form
    console.table(result.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

async function viewAllRoles() {
    try {
        const result = await pool.query('SELECT * FROM role;');

        console.table(result.rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
}


async function addDepartment() {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
      },
    ]);
  
    try {
      const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
      const result = await pool.query(query, [answer.departmentName]);
  
      console.log(`Added department: ${result.rows[0].name}`);
    } catch (error) {
      console.error('Error adding department:', error);
    }
  }


  async function addRole() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: (value) => {
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) ? true : 'Please enter a valid number for salary';
          }          
      },
    ]);
  
    const departmentResult = await pool.query('SELECT * FROM department;');
    const departments = departmentResult.rows.map((row: { id: number; name: string }) => ({
      name: row.name,
      value: row.id,
    }));
  
    // Prompt to select the department for the role
    const departmentAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department does the role belong to?',
        choices: departments,
      },
    ]);
  
    try {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await pool.query(query, [
        answers.roleName,
        parseFloat(answers.salary),
        departmentAnswer.departmentId,
      ]);
  
      console.log(`Added role: ${result.rows[0].title}`);
    } catch (error) {
      console.error('Error adding role:', error);
    }
  }
  

  async function addEmployee() {
    // Prompt for employee's first and last name
    const employeeAnswers = await inquirer.prompt([
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
    ]);
  

    const roleResult = await pool.query('SELECT * FROM role;');
    const roles = roleResult.rows.map((row: { id: number; title: string }) => ({
      name: row.title,
      value: row.id,
    }));
  

    const roleAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: roles,
      },
    ]);
  

    const managerResult = await pool.query('SELECT * FROM employee;');
  

    const managers = managerResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    })) || [];
  

    managers.unshift({ name: 'None', value: -1 });
  

    const managerAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: managers,
      },
    ]);
  
    try {
      const managerId = managerAnswer.managerId === -1 ? null : managerAnswer.managerId; // Set managerId to null if "None" was selected
  

      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await pool.query(query, [
        employeeAnswers.firstName,
        employeeAnswers.lastName,
        roleAnswer.roleId,
        managerId,  // Use the modified managerId (null if "None" was selected)
      ]);
  

      console.log(`Added employee: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }



  async function updateEmployeeRole() {

    const employeeResult = await pool.query('SELECT * FROM employee;');
    const employees = employeeResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
  

    const employeeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's role do you want to update?",
        choices: employees,
      },
    ]);
  

    const roleResult = await pool.query('SELECT * FROM role;');
    const roles = roleResult.rows.map((row: { id: number; title: string }) => ({
      name: row.title,
      value: row.id,
    }));
  

    const roleAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: "Which role do you want to assign to the selected employee?",
        choices: roles,
      },
    ]);
  
    try {
 
      const query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, [roleAnswer.roleId, employeeAnswer.employeeId]);
  

      console.log(`Updated employee: ${result.rows[0].first_name} ${result.rows[0].last_name}'s role`);
    } catch (error) {
      console.error('Error updating employee role:', error);
    }
  }


  

  async function updateEmployeeManager() {

    const employeeResult = await pool.query('SELECT * FROM employee;');
    const employees = employeeResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
  

    const employeeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's manager do you want to update?",
        choices: employees,
      },
    ]);
  

    const managerResult = await pool.query('SELECT * FROM employee;');
    const managers = managerResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    managers.unshift({ name: 'None', value: -1 });
  

    const managerAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's new manager?",
        choices: managers,
      },
    ]);
  
    try {
      const managerId = managerAnswer.managerId === -1 ? null : managerAnswer.managerId;
      const query = 'UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, [managerId, employeeAnswer.employeeId]);
  
      console.log(`Updated manager for: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
    } catch (error) {
      console.error('Error updating manager:', error);
    }
  }
  
  
  async function viewEmployeesByManager() {
    const managerResult = await pool.query('SELECT * FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL);');
    const managers = managerResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
  
    const managerAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select a manager to view their employees:',
        choices: managers,
      },
    ]);
  
    const query = 'SELECT * FROM employee WHERE manager_id = $1';
    const result = await pool.query(query, [managerAnswer.managerId]);
  
    console.table(result.rows);
  }

  

  async function viewEmployeesByDepartment() {
    const departmentResult = await pool.query('SELECT * FROM department;');
    const departments = departmentResult.rows.map((row: { id: number; name: string }) => ({
      name: row.name,
      value: row.id,
    }));
  
    const departmentAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department to view its employees:',
        choices: departments,
      },
    ]);
  
    const query = `
      SELECT e.first_name, e.last_name, r.title 
      FROM employee e
      JOIN role r ON e.role_id = r.id
      WHERE r.department_id = $1
    `;
    const result = await pool.query(query, [departmentAnswer.departmentId]);
  
    console.table(result.rows);
  }

  


  async function deleteDepartment() {
    const departmentResult = await pool.query('SELECT * FROM department;');
    const departments = departmentResult.rows.map((row: { id: number; name: string }) => ({
      name: row.name,
      value: row.id,
    }));
  
    const departmentAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department do you want to delete?',
        choices: departments,
      },
    ]);
  
    const query = 'DELETE FROM department WHERE id = $1';
    await pool.query(query, [departmentAnswer.departmentId]);
  
    console.log('Department deleted successfully.');
  }
  
  

  async function deleteRole() {
    const roleResult = await pool.query('SELECT * FROM role;');
    const roles = roleResult.rows.map((row: { id: number; title: string }) => ({
      name: row.title,
      value: row.id,
    }));
  
    const roleAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to delete?',
        choices: roles,
      },
    ]);
  
    const query = 'DELETE FROM role WHERE id = $1';
    await pool.query(query, [roleAnswer.roleId]);
  
    console.log('Role deleted successfully.');
  }

  


  async function deleteEmployee() {
    const employeeResult = await pool.query('SELECT * FROM employee;');
    const employees = employeeResult.rows.map((row: { id: number; first_name: string; last_name: string }) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
  
    const employeeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee do you want to delete?',
        choices: employees,
      },
    ]);
  
    const query = 'DELETE FROM employee WHERE id = $1';
    await pool.query(query, [employeeAnswer.employeeId]);
  
    console.log('Employee deleted successfully.');
  }
  


  async function viewDepartmentBudget() {
    const departmentResult = await pool.query('SELECT * FROM department;');
    const departments = departmentResult.rows.map((row: { id: number; name: string }) => ({
      name: row.name,
      value: row.id,
    }));
  
    const departmentAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department to view its total utilized budget:',
        choices: departments,
      },
    ]);
  
    const query = `
      SELECT SUM(r.salary) AS total_budget
      FROM employee e
      JOIN role r ON e.role_id = r.id
      WHERE r.department_id = $1
    `;
    const result = await pool.query(query, [departmentAnswer.departmentId]);
  
    console.log(`Total Utilized Budget: $${result.rows[0].total_budget}`);
  }
  
  


async function showMainMenu() {

  const answer = await inquirer.prompt([
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
  ]);

  // Handle the user choice
  switch (answer.action) {
    case 'View All Employees':
      console.log('Displaying all employees...');
      await viewAllEmployees();
      break;
    case 'Add Employee':
      console.log('Add a new employee...');
      await addEmployee();
      break;
    case 'Delete Employee':
        console.log('Deleting employee...')
        await deleteEmployee();
        break;
    case 'Update Employee Manager':
        console.log('Updating employee manager...');
        await updateEmployeeManager();
        break;
    case 'View Employees By Manager':
        console.log('Displaying employees by manager...');
        await viewEmployeesByManager();
        break;
    case 'View All Roles':
      console.log('Displaying all roles...');
      await viewAllRoles();
      break;
    case 'Add Role':
      console.log('Add a new role...');
      await addRole();
      break;
    case 'Update Employee Role':
        console.log('Updating employee role...');
        await updateEmployeeRole();
        break;
    case 'Delete Role':
        console.log('Deleting role...');
        await deleteRole();
        break;
    case 'View All Departments':
      console.log('Displaying all departments...');
      await viewAllDepartments();
      break;
    case 'Add Department':
      console.log('Add a new department...');
      await addDepartment();
      break;
    case 'View Employees By Department':
        console.log('Viewing employees by department...');
        await viewEmployeesByDepartment();
        break;
    case 'Delete Department':
        console.log('Deleting department...');
        await deleteDepartment();
        break;
    case 'View Department Budget':
        console.log('Viewing department budget...');
        await viewDepartmentBudget();
        break;
    case 'Exit':
      console.log('Exiting...');
      await pool.end();  // Close PostgreSQL connection on exit
      process.exit();
      break;
    default:
      console.log('Invalid action');
  }

  // Display the menu again after the action is completed (except for Exit)
  await showMainMenu();
}

async function startApp() {
    console.clear(); // Clear the console for a clean look
    console.log(asciiArt); // Show ASCII art only once at the start
    await showMainMenu(); // Start the main menu after the ASCII art
  }
  
  // Run the startApp function to start the program
  startApp();