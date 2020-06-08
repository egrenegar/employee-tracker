INSERT INTO department (department_name)
VALUES ('Sales'),
('Web Developement'),
('HR'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Junior Developer', 75000, 2), 
('Senior Developer', 120000, 2),
('Recruiter', 60000, 3),
('Senior Analyst', 90000, 4),
('Junior Analyst', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Jeff', 'Hoffman', 3),
('Emily', 'Renegar', 2),
('John', 'Smith', 2),
('Jackson', 'Browne', 1),
('Keyshia', 'Cole', 4),
('Lauren', 'Speed', 5),
('Emma', 'Johnson', 6);