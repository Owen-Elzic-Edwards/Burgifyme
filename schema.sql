DROP DATABASE IF EXISTS burgify_me;
CREATE DATABASE burgify_me;
USE burgify_me;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    sandwich VARCHAR(30) NOT NULL,
    devoured BOOLEAN NOT NULL DEFAULT 0
);