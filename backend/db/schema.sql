CREATE TABLE tokens (
	rowid					INTEGER			NOT NULL PRIMARY KEY,
	id						VARCHAR(255)	NOT NULL UNIQUE,
	symbol					VARCHAR(255)	NOT NULL UNIQUE,
	address					VARCHAR(255)	NOT NULL UNIQUE,
	description				TEXT			NOT NULL,
	image_url				VARCHAR(255)	NOT NULL,
	risk_level				VARCHAR(255)	NOT NULL
);

CREATE TABLE bags (
	rowid					INTEGER			NOT NULL PRIMARY KEY,
	id						VARCHAR(255)	NOT NULL UNIQUE,
	name					VARCHAR(255)	NOT NULL,
	description				TEXT			NOT NULL,
	image_url				VARCHAR(255)	NOT NULL,
	risk_level				VARCHAR(255)	NOT NULL
);

CREATE TABLE bag_tokens (
	rowid					INTEGER			NOT NULL PRIMARY KEY,
	bag_rowid				INTEGER			NOT NULL,
	token_rowid				INTEGER			NOT NULL,
	percentage				INTEGER			NOT NULL,
	
	FOREIGN KEY (bag_rowid) REFERENCES bags(rowid),
	FOREIGN KEY (token_rowid) REFERENCES tokens(rowid)
);
