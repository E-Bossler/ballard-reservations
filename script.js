// REGULAR JAVASCRIPT STUFF











//  SERVER STUFF

// Depedencies 
const express = require('express');
const path = require('path');

// Set up the express app
const app = express();
const port = 9999;

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Variables 
let reservations = [];
let waitList = [];

// Routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get("/make", (req, res) => {
    res.sendFile(path.join(__dirname,'make.html'));
});

app.get("/view", (req, res) => {
    res.sendFile(path.join(__dirname,'view.html'));
});

app.get("/api/reservations", (req, res) => {
    return res.json(reservations)
});

app.get("/api/reservations/:reservation", (req, res) => {
    var chosen = req.params.reservation;
    console.log(chosen);
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
});

app.get("/api/waitlist", (req, res) => {
    return res.json(waitList);
});

app.get("/api/waitlist/:waitlistperson", (req, res) => {
    var chosenWaitList = req.params.waitlistperson;
    console.log(chosenWaitList);
    for (var i = 0; i < waitList.length; i++) {
      if (chosenWaitList === waitList[i].routeName) {
        return res.json(waitList[i]);
      }
    }
    return res.json(false);
});

// create new reservation... 
// if lenght of reservation is greater than 4, 
// creates wiatlist item

app.post('/api/reservations', (req,res) => {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
    let newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
    console.log(newReservation);
    if (reservations.length > 4) {
        waitList.push(newReservation);
        res.json(newReservation);
    } else {
        reservations.push(newReservation);
        res.json(newReservation);
    }
})

// Starts the Server

app.listen(port, () => {
    console.log(`Port ${port} is the best port, so we are upsing port ${port}. This is working on port ${port}.`)
})

