# RoleCall Manager

## Overview
RoleCall Manager is a simple command-line application built to manage employees, roles, and departments in a company. With RoleCall Manager, users can easily perform various tasks, such as adding new employees, updating roles, assigning managers, and more. This application is developed using Node.js, PostgreSQL, and the Inquirer package.

## Table of Contents
- [Visuals](#visuals)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Visuals
Please follow this link for a video walk-through on how to use the command-line application:
https://www.loom.com/share/79f32100542d45dc81282ad2e969bd68?sid=ed983dec-ab5f-48e0-91db-342fbd2bb55f

## Features
- View all employees, roles, and departments.
- Add new employees, roles, and departments.
- Update employee roles.
- Update employee managers.
- View employees by department.
- View employees by manager.
- Delete employees, roles, and departments.
- View the total utilized budget of a department.

## Installation

1. Clone the repository to your local machine:
```md
git clone https://github.com/yourusername/rolecall-manager.git
```

2. Navigate into the project directory:
```md
cd rolecall-manager
```

3. Install the required dependencies:
```md
npm install inquirer pg
```

4. Set up your PostgreSQL database and update the connection details in the code:

Open index.js (or index.ts if you're using TypeScript) and update the following:
```md
const pool = new pg.Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'employees_db',
  password: 'your_postgres_password',
  port: 5432,
});
```

5. Run the database schema file to create the required tables in PostgreSQL:
```md
psql -U postgres -d employees_db -f schema.sql
```

6. Populate the database with seed data (optional):
```md
psql -U postgres -d employees_db -f seeds.sql
```

## Usage

1. Compile TypeScript to JavaScript:

If you're using TypeScript, first compile the TypeScript code to JavaScript:
```md
npx tsc index.ts
```

2. Start the application:

After compiling, start the application by running the generated index.js file:
```md
node index.js
```

3. You will be greeted with an ASCII art title of "RoleCall Manager" and presented with a menu of options to interact with the system:
```md
  _____       _       _____      _ _
 |  __ \     | |     / ____|    | | |
 | |__) |___ | | ___| |     __ _| | |
 |  _  // _ \| |/ _ \ |    / _` | | |
 | | \ \ (_) | |  __/ |___| (_| | | |
 |_|  \_\___/|_|\___|\_____\__,_|_|_|
 |  \/  |
 | \  / | __ _ _ __   __ _  __ _  ___ _ __
 | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|
 | |  | | (_| | | | | (_| | (_| |  __/ |
 |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|
                            __/ |
                           |___/
```

4. Use the arrow keys to navigate the menu and select from the available options:

- View All Employees: Displays a list of all employees.
- Add Employee: Allows you to add a new employee by entering the first name, last name, role, and manager.
- Delete Employee: Allows you to delete an employee.
- Update Employee Manager: Lets you update an employee’s manager.
- View Employees By Manager: Displays a list of all employees that are managed under the Manager chosen.
- View All Roles: Displays all roles in the company.
- Add Role: Prompts for role name, salary, and department to create a new role.
- Update Employee Role: Lets you select an employee and update their role.
- Delete Role: Allows you to delete a role.
- View All Departments: Displays all departments in the company.
- Add Department: Prompts for a department name to add it to the system.
- View Employees By Department: Displays a list of all employees that are under the Department chosen.
- Delete Department: Allows you to delete a department (This feature also deletes all roles in chosen Department).
- Exit: Exits the application.


## Technologies
- Node.js: The runtime environment used to execute JavaScript code.
- PostgreSQL: The relational database used to store and manage employee, role, and department data.
- Inquirer.js: The package used to create an interactive command-line interface.
- pg (node-postgres): A PostgreSQL client for Node.js to interact with the database.

## Database Schema
The PostgreSQL database for this project consists of three tables:

**Department:**

- id (SERIAL PRIMARY KEY)
- name (VARCHAR(30), UNIQUE, NOT NULL)

**Role:**
- id (SERIAL PRIMARY KEY)
- title (VARCHAR(30), UNIQUE, NOT NULL)
- salary (DECIMAL, NOT NULL)
- department_id (INTEGER, FOREIGN KEY to Department.id, NOT NULL)

**Employee:**
- id (SERIAL PRIMARY KEY)
- first_name (VARCHAR(30), NOT NULL)
- last_name (VARCHAR(30), NOT NULL)
- role_id (INTEGER, FOREIGN KEY to Role.id, NOT NULL)
- manager_id (INTEGER, FOREIGN KEY to Employee.id, NULLABLE)


## Future Improvements

Some possible enhancements to the RoleCall Manager application include:
- Ability to track employee performance or attendance.
- Adding more detailed employee information such as contact details.
- Improved UI/UX with a graphical interface or web-based front-end.

## Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!

## Support
If you need help using this project or encounter issues, please reach out via the following options:

GitHub Issues: Report bugs or request features by opening an issue in the GitHub repository.
Email: Contact me at lbelovin@gmail.com for any inquiries.
You can also find more of my work at [https://github.com/omgxlori](https://github.com/omgxlori)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
