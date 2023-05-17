SELECT user_workout_xref.usr_id, Users.username, user_workout_xref.workout_id, Workouts.workout_name
from user_workout_xref
JOIN Users
    ON  Users.usr_id = user_workout_xref.usr_id
JOIN Workouts
    ON Workouts.workout_id = user_workout_xref.workout_id