const express = require('express');// import express
const { Story } = require('../models/story');
const { default: mongoose } = require('mongoose');
const { User } = require('../models/user');
const storiesRouter = express.Router(); // create a new router instance



//------- GET all stories/
storiesRouter.get("/", async (req, res) => {
    console.log("reached the 'stories/' GET route");
    const allStories = await Story.find();
    res.status(200).json(allStories);
});



//------- GET a story by id
storiesRouter.get("/:id", async (req, res) => {
    console.log(" reached the 'stories/:id' GET route");
    const {id} = req.params; //grab the id from the req.params object
    console.log(id);

    
    const story = await Story.findById(id);
    console.log(story);


    res.status(200).json(story);

});




//-------- GET story by User ID
storiesRouter.get("/user/:userId", async (req, res) => {
    console.log("reached the GET stories by user/:userId/ route");
    const { userId } = req.params;

    const userStories = await Story.find( { author: userId});
    console.log(userStories);
    res.status(200).json(userStories);
})


//-------- POST a new story
storiesRouter.post("/", async (req, res) => {
    console.log("reached the 'stories/' POST route");
    console.log(req.body);

    const { title, storyText, image, author } = req.body;



    const newStory = await Story.create({
        title,
        storyText,
        image,
        author
    });

    //Now, take the newly created story's id and push it to the User.stories array
    //fetch the user by id
    const user = await User.findById(author);
    //push the new story's id to the user's stories[] array
    console.log("okay, created a new story, now adding it to the user's stories array...")
    user.stories.push(newStory._id);
    await user.save(); //sends a signal to mongoDB to updated the user document with our new changes...

    res.status(201).json({newStory, user});
});





module.exports = storiesRouter;