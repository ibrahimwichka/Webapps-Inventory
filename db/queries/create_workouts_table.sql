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
        ON UPDATE CASCADE
)