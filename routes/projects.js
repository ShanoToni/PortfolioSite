const express                   = require("express");
const router                    = express.Router({mergeParams:true});
const Project                   = require("../models/project");
const middleware                = require("../middleware/index");
//index route
router.get("/", (req,res) =>{
    Project.find({}).sort({date:-1}).exec((err, projects) =>{
        if(err){
            console.log(err);
            //HANDLE ERRORS HERE-------------------------------------------------------------------
        } else {
            res.render("projects/index", {projects:projects});
        }
    });
});


//Create Route
//form get
router.get("/new", middleware.isLoggedIn, (req,res)=>{
    res.render("projects/new");
});
//Create post
router.post("/", middleware.isLoggedIn, (req,res)=>{
    
    //create the project
    let projTitle = req.body.title;
    let projDesc = req.body.description;
    Project.create({title:projTitle, description: projDesc}, (err, createdProj)=>{
        if(err){
            console.log(err);
            //HANDLE IT--------------------------------------------------------------
        }
        else{
            //create the image
            let imgSource = req.body.src;
            let imgDesc = req.body.desc;
            for(let i=0;i<imgSource.length; i++){
                createdProj.images.push({img:imgSource[i], description:imgDesc[i]});
            }
            createdProj.save();
            res.redirect("/projects");
        }
    });
});

//Show route
router.get("/:id", (req,res) =>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if(err){
            console.log(err);
            //HANDLE ERRORS HERE-------------------------------------------------------------------
        } else {
            res.render("projects/show", {project:foundProject});
        }
    });
});

//Edit form Route
router.get("/:id/edit", middleware.isLoggedIn, (req,res) =>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if(err){
            console.log(err);
            //HANDLE ERRORS HERE-------------------------------------------------------------------
        } else {
            res.render("projects/edit", {project:foundProject});
        }
    });
})

//Update Route
router.put("/:id" , middleware.isLoggedIn, (req, res) =>{
    //empty old images
    Project.findByIdAndUpdate(req.params.id, req.body.Project, (err, updated)=>{
        if(err){
            console.log(err);
            //Handle error----------------------------------------------------------------------------
        } else {
            Project.findById(req.params.id, (err, found)=>{
                if(err){
                    console.log(err);
                    //Handle error----------------------------------------------------------------------------
                } else {
                    //remove old images
                    for(let i=found.images.length-1;i>=0;i--){
                        found.images[i].remove();
                    }
                    found.save();

                    let imgSource = req.body.src;
                    let imgDesc = req.body.desc;
                    //insert updated images
                    for(let i=0;i<imgSource.length; i++){
                        if(imgSource[i]!=""){
                            found.images.push({img:imgSource[i], description:imgDesc[i]});
                        }
                    }
                    found.save();

                    res.redirect("/projects/" + req.params.id);
                }
            });
        }
    });
   
})
//Delete Route
router.delete("/:id", middleware.isLoggedIn, (req,res) =>{
    Project.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });
});




module.exports = router;