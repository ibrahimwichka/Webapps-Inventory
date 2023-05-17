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
            ON UPDATE CASCADE
)