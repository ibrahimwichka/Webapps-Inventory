const db = require("./db_connection");

// db_init_print prints out the tables in the db with their sample data

// Query and print out data/contents
const select_workouts_sql = `
SELECT *
FROM Workouts
JOIN Muscles
    ON Workouts.muscle_id = Muscles.muscle_id
ORDER BY
    Workouts.workout_id
`;

db.execute(select_workouts_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'Workouts' contents:")
        console.log(results);
    }
);

const select_muscles_sql = "SELECT * FROM Muscles";

db.execute(select_muscles_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'Muscles' contents:")
        console.log(results);
    }
);

const select_users_sql = "SELECT * From Users";

db.execute(select_users_sql,
    (error, results) => {
        if (error)
            throw error;
        
        console.log("Table 'Users' contents:")
        console.log(results);
    }
)

const select_user_workout_xref_sql = `
SELECT user_workout_xref.usr_id, Users.username, user_workout_xref.workout_id, Workouts.workout_name
from user_workout_xref
JOIN Users
    ON  Users.usr_id = user_workout_xref.usr_id
JOIN Workouts
    ON Workouts.workout_id = user_workout_xref.workout_id
`;
db.execute(select_user_workout_xref_sql,
    (error, results) => {
        if (error)
            throw error;
        
        console.log("Table 'user_workout_xref' contents:")
        console.log(results);
    }
)

db.end();