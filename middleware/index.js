let middlewareOBJ = {};

middlewareOBJ.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/projects");
    }
};


module.exports = middlewareOBJ;