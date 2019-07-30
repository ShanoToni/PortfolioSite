const express                       = require("express");
const app                           = express();
const bodyParser                    = require("body-parser");
const mongoose                      = require("mongoose");
const passport                      = require("passport");
const localStrategy                 = require("passport-local");
const methodOverride                = require("method-override");
const connectFlash                  = require("connect-flash");


//add the routes later



//connect to the DB
mongoose.connect('mongodb+srv://shano:tFS-4FV-BbT-h9a@cluster0-andyp.mongodb.net/yelpCamp?retryWrites=true&w=majority', {useNewUrlParser: true});


//set up the app
app.use(connectFlash());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//PASSPORT
app.use(require("express-session")({
    secret: "Vadim Suka Asshole Neighbour",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new localStrategy(Admin.authenticate()));
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());

//set up globals for the app
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");

//use the routes here



app.get("*", (req,res)=>{
    res.send("Awesome Hooked Up!");
})

//start the server

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server is started!");
});