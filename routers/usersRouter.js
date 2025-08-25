const express = require('express');// import express
const { User } = require('../models/user');
const { default: mongoose } = require('mongoose');
const usersRouter = express.Router(); // create a new router instance


//------- GET all users/
usersRouter.get("/", (req, res) => {
    //gets all the users in the database and returns them to the client
    console.log("----reached the GET all users route.");
    
    //---create async function for fetching all users in the users collection in mongodb atlas
    const getAllUsers = async () => {
        const allUsers = await User.find(); //-- wait for the fetch of all users...
        res.status(200).json(allUsers); //---then send it back to client....

        res.status(200).render("users", { users: allUsers });
    }


    getAllUsers();

});



//-------- GET a user by id
usersRouter.get("/:id", (req, res) => {
    //gets a user by id from the database and returns it to the client
    //in the url it would look like this: localhost:8080/users/77eu8-95e7y
    console.log("---reached the 'users/:id' GET route");
    const userId = req.params.id; //---grab the id from the url address

    console.log(userId); //---let's see what id we are going to query for...



    //---create async function for fetching all users in the users collection in mongodb atlas
    const getUserById = async () => {
        const filter = { _id: userId}
        const user = await User.findOne(filter).populate('stories'); //---- wait for the fetch of a single user that we query by it's _id property and also fetch the user's stories in the stories array[] before sending back to client using .populate('stories').
        console.log("user found:", user); //--- log the user that we found


        res.status(200).json(user); //---then send it back to client....
    }


    getUserById();


});



//-------- POST a new user
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


});//-----End of POST new user






//-------- UPDATE existing user by :id
usersRouter.patch("/:id",  async (req, res) => {
  

    console.log("🔥request param id: ", req.params.id);
    console.log("🔥request body: ",req.body);

    try {
        const {id} = req.params; //---this takes the property with that name and makes it into a variable like --> const id = req.params.id
        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }


        //1.) Whitelist
        const allowedUpdates = ["firstName", "lastName", "password"];
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(
                ([objKey, objValue]) => allowedUpdates.includes(objKey) && objValue !== undefined
            )
        );


        if( Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }


        // 2.) Atomic Updates
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updates}, { new: true, runValidators: true, context: "query" }  );


        if(!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }


        return res.status(200).json({ successMsg: "✅ User updated successfully!", user: updatedUser });

    } catch (error) {
        console.error("PATCH /users/:id error: ", error);
        return res.status(500).json({ error: "Internal server error, something went wrong on our end." });
        
    }

});







// const myDog = {
//     name: "Rex",
//     breed: "German Shepherd",
//     age: 5,
//     "favorite Toy": "red ball" 
// };

// console.log(myDog["favorite Toy"]);





module.exports = usersRouter; // export the usersRouter instance










//--------❌ OLD UPDATE existing user by :id
// usersRouter.patch("/:id", (req, res) => {
//     //--fetch the user by id
//     //--then we form a new updatedUser object by combining the user we fetched + the properties in the req.body
//     console.log("🔥request param id: ", req.params.id);
//     console.log("🔥request body: ",req.body);

//     //---Array of valid properties that can be updated
//     const updatedableProperties = ["firstName", "lastName", "password"];

//     const updateObject = {};

//     const validityCheck = () => {
//         //loop through the array and check if the property exits in the req.body
//         //if so, we can safely add it to the updateObject
//         updatedableProperties.forEach(prop => { 
//             console.log("prop:", prop);
//             console.log("req.body[prop]:", req.body[prop]);

//             if(req.body[prop]) {
//                 updateObject[prop] = req.body[prop];
//             }
//             else {
//                 console.log("Property not found: ", prop);
//             }
//         });

//     };

//     validityCheck();

//     console.log("updateObject:", updateObject);

//     //---capture the data above in variables
//     const userId = req.params.id;


//     const updateUserById = async () => {
//         const currentUser = await User.findOne({_id: userId}); //find the current user in mongoDB
//         console.log("currentUser:", currentUser);

//         // const updatedUser = { ...currentUser._doc, ...updateObject};//----
//         const updatedUser2 = Object.assign({}, currentUser._doc, updateObject);
//         // console.log("updatedUser:", updatedUser);
//         console.log("updatedUser2:", updatedUser2);

//         //----last step, write the updated user to the database
//         const updateConfirmMsg = await User.updateOne({_id: userId}, updatedUser2);

//         console.log("User updated successfully", updateConfirmMsg);

//         res.status(200).json({ successMsg: "✅ User updated successfully!", updateConfirmMsg })
//     };


//     updateUserById();

// });