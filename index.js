var express = require("express");
var app = express();

var bodyParser = require('body-parser');

const port = 80; // change this field to change port
var db = { space: [] } // temp DB to store the points 

app.use(bodyParser.urlencoded({ extended: true }));

// return all points as JSON
app.get('/space', (req, res) => {
    res.send(db.space)
});

// create a new point and return it
app.post('/point', (req, res) => { // i can try to get params but is empty with POSTMAN (with CURL works with req.params.x/y )
    db.space.push({ x: req.query.x, y: req.query.y })  // if use POSTMAN use it else change in req.params.x and req.params.y
    res.send({ msg: "Point created", point: { x: req.query.x, y: req.query.y } }) // read line 20 
});

// return a point in space with n as index 
app.get('/lines/:n', (req, res) => {
    res.send(req.params.n < db.space.length ? db.space[req.params.n] : { msg: "this point don't exists" })
});

// delete all point into an array
app.delete('/space', (req, res) => {
    res.send({ msg: "All Points has been deleted" });
})

// start a WebServer
app.listen(port, () => {
    console.log(`Server started! At http://localhost:${port}`);
});