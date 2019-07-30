const express                   = require("express");
const router                    = express.Router({mergeParams:true});
const nodemailer                = require("nodemailer");



//register
router.get("/",  (req,res)=>{
    res.render("contactme");
});

router.post("/",  (req,res)=>{

        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "anton.b.mitkov@gmail.com", // generated ethereal user
              pass: "nnacaxekrxxegywp" // generated ethereal password
            },

            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
              }
          });
          //check setup
          transporter.verify(function(error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

        let message = {
            from: `${req.body.name} <${req.body.email}>`,
            to: 'Anton Mitkov <anton.b.mitkov@gmail.com>',
            subject: req.body.subject,
            text: req.body.text +"  From->"+ req.body.email
        };
    
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
            } else {
                console.log('Message sent successfully!');
            }
    
            
    
            // only needed when using pooled connections
            transporter.close();
            res.redirect("/projects");
        });

});





module.exports = router;