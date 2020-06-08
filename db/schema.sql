DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(30)
);

CREATE TABLE role (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER
);

CREATE TABLE employee (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER
);