PRAGMA foreign_keys = ON;
CREATE TABLE labs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL,
    link VARCHAR(20) NOT NULL,
    intro VARCHAR(200) NOT NULL,
    people VARCHAR(100)
);

CREATE TABLE comments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    labid INTEGER NOT NULL,
    rating INTEGER NOT NULL, 
    name VARCHAR(20) NOT NULL,
    word VARCHAR(200) NOT NULL,
    FOREIGN KEY (labid) REFERENCES labs(id)
);

CREATE TABLE users (
    username        VARCHAR(20),
    password        VARCHAR(256),   -- not present for Google OAuth2 users
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created         TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions(
    id INTEGER NOT NULL,
    session_id VARCHAR(255),
    data BLOG,
    expiry DATETIME,
    PRIMARY KEY (id),
    UNIQUE (session_id)
);