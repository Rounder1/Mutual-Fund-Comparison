DROP DATABASE IF EXISTS funds_db;
CREATE DATABASE funds_db;
USE funds_db;

CREATE TABLE funds
(
	fund_id int NOT NULL AUTO_INCREMENT,
    id int NOT NULL,
	symbol varchar(10) NOT NULL,
	fund_name varchar(150) NOT NULL,
	expense_ratio DOUBLE,
	PRIMARY KEY (fund_id)
);

ALTER TABLE funds ADD FOREIGN KEY (id) REFERENCES users(id);