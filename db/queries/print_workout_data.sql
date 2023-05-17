SELECT *
FROM Workouts
JOIN Muscles
    ON Workouts.muscle_id = Muscles.muscle_id
ORDER BY
    Workouts.workout_id