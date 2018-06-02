DROP DATABASE IF EXISTS funds_db;
CREATE DATABASE funds_db;
USE funds_db;

CREATE TABLE funds
(
	fund_id int NOT NULL AUTO_INCREMENT,
	symbol varchar(10) NOT NULL,
	fund_name varchar(150) NOT NULL,
	expense_ratio DOUBLE,
	PRIMARY KEY (fund_id)
);

CREATE TABLE funds_history
(
	hist_id int NOT NULL AUTO_INCREMENT,
	close_date DATETIME NOT NULL,
	close_price int NOT NULL,
	fund_id int,
	PRIMARY KEY (hist_id),
	FOREIGN KEY(fund_id) REFERENCES funds(fund_id)

);
CREATE TABLE User
(
    id int NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    username VARCHAR(250),
    about VARCHAR(250),
    email VARCHAR(250) NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login VARCHAR(255),
    status ENUM('active', 'inactive'),
    PRIMARY KEY(id)
);