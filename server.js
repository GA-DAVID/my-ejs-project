//-----------imports
const express = require('express');



//----import routers here ----
const usersRouter = require('./routers/usersRouter');



//--- import env variables ----
const PORT = process.env.PORT || 8080; //refer to env var named PORT, if not found, default to 8080


//-----create our express app 🪺
const myApp = express();


// ------ 🪈🪈🥅 MIDDLEWARES -----











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
myApp.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🎧`);
})






