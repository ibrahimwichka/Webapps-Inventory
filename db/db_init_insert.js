const db = require("./db_connection");

// db_init_insert deletes rows from the existing tables and adds representative sample data

// Delete rows from tables
const delete_xref_table_sql = "DELETE FROM user_workout_xref;"

db.execute(delete_xref_table_sql);

const delete_workouts_table_sql = "DELETE FROM Workouts;"

db.execute(delete_workouts_table_sql);

const delete_muscles_table_sql = "DELETE FROM Muscles;"

db.execute(delete_muscles_table_sql);

const delete_users_table_sql = "DELETE FROM Users;"

db.execute(delete_users_table_sql);


// Insert data into tables
const insert_muscles_sql = `
    INSERT INTO Muscles
        (muscle_id, muscle_name)
    VALUES
        (?, ?);
`
db.execute(insert_muscles_sql, [1, "Triceps/Shoulders"]);
db.execute(insert_muscles_sql, [2, "Quadriceps"]);
db.execute(insert_muscles_sql, [3, "Hamstring"]);
db.execute(insert_muscles_sql, [4, "Biceps"]);
db.execute(insert_muscles_sql, [5, "Calves"]);
db.execute(insert_muscles_sql, [6, "Core"]);

const insert_users_sql = `
    INSERT INTO Users
        (usr_id, username, usr_height, password, usr_weight, usr_dob)
    VALUES
        (?, ?, ?, ?, ?, ?);
`
db.execute(insert_users_sql, [1, "ibrahimwichka06", "5 7", "#", "138 lbs", null]);
db.execute(insert_users_sql, [2, "mrfunny", "5 10", "#", "180 lbs", null]);
db.execute(insert_users_sql, [3, "imjacked", "6 2", "#", "190 lbs", null]);
db.execute(insert_users_sql, [4, "hehehe", "4 11", "#", "98 lbs", null]);
db.execute(insert_users_sql, [5, "therealrock", "7 2", "#", "200 lbs", null]);


const insert_workouts_sql = `
    INSERT INTO Workouts
        (workout_id, workout_name, workout_length, workout_intensity, workout_setsreps, muscle_id, workout_description)
    VALUES
        (?, ?, ?, ?, ?, ?, ?);
`
db.execute(insert_workouts_sql, [1, "Pushups", "5 mins", 5, "3:15", 1, "COOL"]);
db.execute(insert_workouts_sql, [2, "Leg Press", "10 mins", 7, "4:12", 2, "Really COOl"]);
db.execute(insert_workouts_sql, [3, "Mile Walk", "60 mins", 2, "5:n/a", 3, "Boring"]);
db.execute(insert_workouts_sql, [4, "Pull Ups", "5 mins", 5, "3:8", 6, "Fun"]);

const insert_xref_sql = `
    INSERT INTO user_workout_xref
        (usr_id, workout_id)
    VALUES
        (?, ?);
`

db.execute(insert_xref_sql, [1, 1]);
db.execute(insert_xref_sql, [1, 2]);
db.execute(insert_xref_sql, [2, 3]);
db.execute(insert_xref_sql, [5, 2]);
db.execute(insert_xref_sql, [4, 1]);
db.execute(insert_xref_sql, [3, 4]);
db.execute(insert_xref_sql, [3, 1]);
db.execute(insert_xref_sql, [5, 3]);
db.execute(insert_xref_sql, [2, 4]);

db.end();



