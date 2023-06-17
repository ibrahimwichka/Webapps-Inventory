// set up the server
const express = require("express")
const logger = require("morgan")
const app = express()
const port = 3000
const DEBUG = true;
const db = require("./db/db_connection");

app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

app.use(logger("dev"))
app.use(express.static(__dirname + '/public'))
app.use( express.urlencoded({ extended: false }) );



// define a route for the default homepage
app.get("/", (req,res) => {
    res.render('index')
});

const read_workouts_detail_all_sql = `
    SELECT *
    FROM Workouts
    JOIN Muscles
        ON Workouts.muscle_id = Muscles.muscle_id
    WHERE workout_id = ?
`

app.get("/workouts/:id", (req,res, next) => {
    db.execute(read_workouts_detail_all_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error);
        if (results.length == 0)
            res.status(404).send(`No workout found with id = "${req.params.id}"` );
        else {
            let data = {workout: results[0]};
            res.render('detail', data); 
        }
    });
});

app.get("/plans", (req,res) => {
    res.render('plans')
});

app.get("/profiles", (req,res) => {
    res.render('profiles')
});


const read_workouts_all_sql = `
    SELECT *
    FROM Workouts
    JOIN Muscles
        ON Workouts.muscle_id = Muscles.muscle_id
    ORDER BY
        Workouts.workout_id 
`

app.get("/workouts", (req,res) => {
    db.execute(read_workouts_all_sql, (error, results) =>
    {
        if (DEBUG){
            console.log(error ? error:results)
        }
        if (error){
            res.status(500).send(error)
        }
        else {
            let data = { workouthome : results };
            res.render('workouts', data);
        }
    })
});

const delete_xref_sql = `
    DELETE 
    FROM user_workout_xref
    Where workout_id = ?
`
const delete_workout_sql = `
    DELETE
    From Workouts
    Where workout_id = ?
`

app.get("/workouts/:id/delete", ( req, res ) => {
    db.execute(delete_xref_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
    });
    db.execute(delete_workout_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/workouts");
        }
    });
});

const create_workout_sql = ` 
    INSERT INTO Workouts
    (workout_name, workout_length, workout_intensity, workout_setsreps, muscle_id, workout_description)
    VALUES
    (?, ?, ?, ?, ?, ?);
    
`

const update_workout_sql = `
UPDATE
Workouts
SET
workout_name = ?,
workout_length = ?,
workout_intensity= ?,
workout_setsreps = ?,
muscle_id = ?,
workout_description = ?
WHERE
workout_id = ?
`



app.post("/workouts", ( req, res ) => {
    db.execute(create_workout_sql, [req.body.name, req.body.length, req.body.intensity, req.body.setsreps, req.body.muscle, req.body.description], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        
        else {
            res.redirect(`/workouts/${results.insertId}`);
        }
    });
});

app.post("/workouts/:id", ( req, res ) => {
    db.execute(update_workout_sql, [req.body.name2, req.body.length2, req.body.intensity2, req.body.setsreps2, req.body.muscle2, req.body.description2, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/workouts/${req.params.id}`);
        }
    });
});


// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`)
});




