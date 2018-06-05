CREATE TABLE funds
(
	fund_id int NOT NULL AUTO_INCREMENT,
    id int NOT NULL,
	symbol varchar(10) NOT NULL,
	fund_name varchar(150) NOT NULL,
	expense_ratio DOUBLE,
	PRIMARY KEY (fund_id),
    created_at timestamp default current_timestamp
);

ALTER TABLE funds ADD FOREIGN KEY (id) REFERENCES users(id);