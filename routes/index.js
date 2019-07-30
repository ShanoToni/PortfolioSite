const express                   = require("express");
const router                    = express.Router({mergeParams:true});
const passport                  = require("passport");
const User                      = require("../models/user");
const middleware                = require("../middleware/index");



//register
router.get("/register", middleware.isLoggedIn, (req,res)=>{
    res.render("register")
});

//register Create
router.post("/register", middleware.isLoggedIn, function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, newUser)=>{
        if(err){
            console.log(err.message);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, ()=>{
           res.redirect("/projects"); 
        });
    });
});

//login
router.get("/login", (req,res)=>{
    res.render("login");
});

//login POST
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/projects",
        failureRedirect:"/login"
    }) , (req,res)=>{
});

//logout
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/projects");
});



module.exports = router;