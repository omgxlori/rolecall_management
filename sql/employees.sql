SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
       (SELECT CONCAT(m.first_name, ' ', m.last_name) 
        FROM employee m WHERE m.id = e.manager_id) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id;