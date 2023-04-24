// set up the server
const express = require("express")
const logger = require("morgan")
const app = express()
const port = 3000

app.use(logger("dev"))
app.use(express.static(__dirname + '/public'))



// define a route for the default homepage
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/detail", (req,res) => {
    res.sendFile(__dirname + "/views/detail.html");
});

app.get("/plans", (req,res) => {
    res.sendFile(__dirname + "/views/plans.html");
});

app.get("/profiles", (req,res) => {
    res.sendFile(__dirname + "/views/profiles.html");
});

app.get("/workouts", (req,res) => {
    res.sendFile(__dirname + "/views/workouts.html");
});

// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`)
});




