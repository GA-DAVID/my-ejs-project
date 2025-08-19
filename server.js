//-----------imports
const express = require('express');
const mongoose = require('mongoose'); //---🦦



//----import routers here ----
const usersRouter = require('./routers/usersRouter');



//--- import env variables ----
const PORT = process.env.PORT || 8080; //refer to env var named PORT, if not found, default to 8080
const DATABASE_URL = process.env.DATABASE_URL; //import the dabase url

//-----create our express app 🪺
const myApp = express();


// ------ 🪈🪈🥅 MIDDLEWARES -----
myApp.use(express.json()); //---- parse any incoming request that has a body of data attached to it. 




const handleHomeRoute = (req, res) => {
    res.send("Welcome to the Home Page!");
}

//----- 🛣️ ROUTES -----
myApp.get("/", handleHomeRoute);



//---- user routes -----
myApp.use('/users', usersRouter); //if the url starts with /users, funnel requests to usersRouter.js 

//--- stories routes ----
// myApp.use('/stories', /*storiesRouter() goes here */);




//----🎧open server connection
//---- 🦦 Let mongoose coordinate turning on the express server and connecting to MongoDB
const mongooseStartServer = async () => {
    try {
        //---okay mongoose, make the connection to MongoDBAtlas☁️🥭
        await mongoose.connect(DATABASE_URL);
        //---if successful in connecting to db, open server connection...
        myApp.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT} 🥭☁️🦦🎧`);
        });
    } catch (error) {
        //if any issues arise while trying to connect to Atlasmongodb, catch them here and log them to console.
        console.error("Error connecting to the database:", error);
    }
};

mongooseStartServer(); //---call the function to connect to database and start server 🏁


// myApp.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT} 🎧`);
// })





