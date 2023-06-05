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
        else if (results.length == 0)
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

// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`)
});




