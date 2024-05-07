const express = require("express");

const app = express();
app.use(express.json()); // Allows our express server to accept/understand json
app.use(express.urlencoded({ extended: false }));
const port = 3000;

// Express GET route
app.get("/", (request, response) => {
    response.send("Hello World")
})

// GET route. Hit hit this endpoint, go to "localhost:3000/route"
app.get("/route", logTime, (req, res) => { // This route has middleware (logTime). Middleware is touched before the route sends the message
    res.send("All Done!");
})

// Middleware function (logTime) for the '/route' GET route
function logTime(req, res, next) { // In middleware, we can access to the 'req' object, 'res' object and a method called next()
    let date = new Date();
    console.log(date.toLocaleDateString());
    next() // next() allows us to carry on with the rest of the route
}

// POST route
// To hit this route, use Postman to make a POST request, hit 'localhost:3000/login' with a body
app.post("/login", function (req, res) { // In POST request, we make use of the 'req' object
    const { username, password } = req.body; // For this to work, we need to send a json object using postman with properties for 'username' and 'password'
    res.send(`Welcome ${username}, your password is ${password}`);
})

// Another POST route
// To hit this route, use Postman to make a POST request, hit 'localhost:3000/api/users' with a body
app.post("/api/users", function (req, res) {
    res.status(201).send("Route reached"); // res.status can be used to send back an appropriate status code.
})

// express.static can be used to upload other files like html, css, js files into our server
app.use(express.static(__dirname + "/public"));

// server app is listening on port. This will start our server
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})