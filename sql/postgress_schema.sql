DROP TABLE IF EXISTS links;

CREATE TABLE labs(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    link VARCHAR(200) NOT NULL,
    intro VARCHAR(400) NOT NULL,
    people VARCHAR(200)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    labid INTEGER NOT NULL,
    rating INTEGER NOT NULL, 
    name VARCHAR(20) NOT NULL,
    word VARCHAR(300) NOT NULL,
    FOREIGN KEY (labid) REFERENCES labs(id)
);

CREATE TABLE users (
    username        VARCHAR(20)     UNIQUE,
    password        VARCHAR(256),   -- not present for Google OAuth2 users
    id SERIAL PRIMARY KEY,
    created         TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    name            VARCHAR(20),
    email           VARCHAR(20)

);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255),
    data BYTEA,
    expiry TIMESTAMP,
    UNIQUE (session_id)
);
