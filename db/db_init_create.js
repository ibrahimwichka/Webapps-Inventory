const db = require("./db_connection");

// db_init_create drops all existing tables and creates tables for the db to host data

// Drops existing tables if they exist

const drop_xref_table_sql = "DROP TABLE IF EXISTS user_workout_xref;"

db.execute(drop_xref_table_sql);

const drop_users_table_sql = "DROP TABLE IF EXISTS Users;"

db.execute(drop_users_table_sql);

const drop_workouts_table_sql = "DROP TABLE IF EXISTS Workouts;"

db.execute(drop_workouts_table_sql)

const drop_muscles_table_sql = "DROP TABLE IF EXISTS Muscles;"

db.execute(drop_muscles_table_sql)

// Creates tables

const create_muscle_table_sql = `
    CREATE TABLE Muscles (
    muscle_id INT NOT NULL,
    muscle_name VARCHAR(45) NULL,
    PRIMARY KEY (muscle_id));
`
db.execute(create_muscle_table_sql);

const create_workouts_table_sql = `
    CREATE TABLE Workouts (
    workout_id INT NOT NULL,
    workout_name VARCHAR(45) NULL,
    workout_length VARCHAR(45) NULL,
    workout_intensity INT(11) NULL,
    workout_setsreps VARCHAR(45) NULL,
    muscle_id INT(11) NULL,
    PRIMARY KEY (workout_id),
    INDEX workoutsMuscles_idx (muscle_id ASC),
        CONSTRAINT workoutsMuscles
        FOREIGN KEY (muscle_id)
        REFERENCES Muscles (muscle_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE);
`
db.execute(create_workouts_table_sql);

const create_user_table_sql = `
    CREATE TABLE Users (
    usr_id INT NOT NULL,
    username VARCHAR(45) NULL,
    usr_height VARCHAR(45) NULL,
    password VARCHAR(45) NULL,
    usr_weight VARCHAR(45) NULL,
    usr_dob DATE NULL,
    PRIMARY KEY (usr_id));
  
`
db.execute(create_user_table_sql);

const create_xref_table_sql = `
    CREATE TABLE user_workout_xref (
    usr_id INT NOT NULL,
    workout_id INT NOT NULL,
    PRIMARY KEY (usr_id, workout_id),
    INDEX xrefUser_idx (usr_id ASC),
    INDEX xrefWorkout_idx (workout_id ASC),
        CONSTRAINT xrefUser
            FOREIGN KEY (usr_id)
            REFERENCES Users (usr_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,
        CONSTRAINT xrefWorkout
            FOREIGN KEY (workout_id)
            REFERENCES Workouts (workout_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`
db.execute(create_xref_table_sql);

db.end();








