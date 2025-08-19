const express = require('express');// import express
const { User } = require('../models/user');
const usersRouter = express.Router(); // create a new router instance


usersRouter.get("/", (req, res) => {
    //gets all the users in the database and returns them to the client
    console.log("reached the 'users/' GET route");
    res.send("ALL of the users would go here [🐻,🦡,🐟,😭,😺,🤖,🐺,🦝,🦫,🦦]")


});

usersRouter.get("/:id", (req, res) => {
    //gets a user by id from the database and returns it to the client
    //in the url it would look like this: localhost:8080/users/77eu8-95e7y
    console.log("reached the 'users/:id' GET route");

})

usersRouter.post("/", (req, res) => {
    //creates a new user in the database and returns the created user to the client
    console.log("reached the 'users/' POST route");
    console.log(req.body); //let's see the data that came in

    //----ideally, we would check all the properties to make sure it has fname, lname, email, pw, etc....

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    //----now we can use the User mongoose model to post to the users collection
    
    const createUser = async () => {
        console.log("about to post a new user...");
        const result = await User.create(newUser); //--wait for mongoose to post our new user....

        console.log("new user created:", result); //--- log the results of posting to mongodb

        res.status(201).json(result);

    }

    createUser()


});




module.exports = usersRouter; // export the usersRouter instance