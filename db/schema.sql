### Schema
DROP DATABASE IF EXISTS funds_db;
CREATE DATABASE funds_db;
USE funds_db;

CREATE TABLE funds
(
	fund_id int NOT NULL AUTO_INCREMENT,
	symbol varchar(10) NOT NULL,
	expense_ratio DOUBLE ALLOW NULL,
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
