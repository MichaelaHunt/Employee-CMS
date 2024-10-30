INSERT INTO department (name)
VALUES ('Accounting'),
('HR'),
('R&D'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Graphic Designer', 50000, 4),
('Accountant', 60000, 1),
('Researcher', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Powers', 1, NULL),
('Matthew', 'Johnson', 2, 1);