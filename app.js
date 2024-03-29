//Initial requires
const express                       = require("express");
const app                           = express();
const bodyParser                    = require("body-parser");
const mongoose                      = require("mongoose");
const passport                      = require("passport");
const localStrategy                 = require("passport-local");
const methodOverride                = require("method-override");
const connectFlash                  = require("connect-flash");

//DB
const Project                       = require("./models/project");
const User                         = require("./models/user");

//add the routes later
const projectRoutes                 = require("./routes/projects");
const indexRoutes                   = require("./routes/index");
const contactRoutes                 = require("./routes/contactme");

//connect to the DB
mongoose.connect('mongodb+srv://shano:tFS-4FV-BbT-h9a@cluster0-andyp.mongodb.net/shanoCode?retryWrites=true&w=majority', {useNewUrlParser: true});



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

 passport.use(new localStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

//set up globals for the app
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");

//use the routes here
app.use("/", indexRoutes);
app.use("/projects",projectRoutes);
app.use("/contactme", contactRoutes);


app.get("*", (req,res)=>{
    res.redirect("/projects");
})

//start the server

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});