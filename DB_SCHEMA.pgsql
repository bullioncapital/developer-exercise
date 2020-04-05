DROP DATABASE IF EXISTS counter;
DROP TABLE IF EXISTS countdata;
CREATE DATABASE counter WITH OWNER postgres;
\c counter;
CREATE TABLE countdata (
    timeStamp TIMESTAMP NOT NULL,
    count numeric NOT NULL
);
INSERT INTO countdata (timeStamp, count) VALUES (CURRENT_TIMESTAMP, 0);