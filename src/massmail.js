var async = require("async");
var nodemailer = require("nodemailer");



var mass = function(emails) {
  var listofemails = emails;
  var success_email = [];
  var failure_email = [];
  var transporter;

  function massMailer() {
    transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net', // godaddys outgoing smtp server
        secure: true,
        secureConnection: false,
        auth: {
          user: 'info@rockymtanglers.com',
          pass: 'Rocky1904Trout'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        pool: true,
        maxConnections: 10000
    });


           // Will do it later.
       this.invokeOperation();
   }

   /* Invoking email sending operation at once */

   massMailer.prototype.invokeOperation = function() {

       async.each(listofemails, this.SendEmail, function(){  //Async.each is like for each in js loops through the array and calls self.sendmail
           console.log(success_email); //when all the actions are complete we output the console logs
           console.log(failure_email);
       });
   }


   massMailer.prototype.SendEmail = function(Email,callback) {
       console.log("Sending email to " + Email);
       this.status = false;
       // waterfall will go one after another
       // So first email will be sent
       // Callback will jump us to next function
       // in that we will update DB
       // Once done that instance is done.
       // Once every instance is done final callback will be called.
       async.waterfall([ //Modules written in waterfall will pass data to next module until last module is over.
           function(callback) {
               var mailOptions = {
                   from: 'info@rockymtanglers.com',
                   to: Email,
                   subject: 'Hi ! This is from Async Script',
                   html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">Rocky Mountain Anglers News Letter</h2><b><p style=" color: black; text-align:center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></b><p style="text-align:center; color:black;">Call the Shop For Up To Date Information on Our Local Waters 303-447-2400<p><a href="http://localhost:8080/" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Check Out Our Site for Updates!</a></div>'
               };
               transporter.sendMail(mailOptions, function(error, info) { //nodemailers sending function
                   if(error) {
                       console.log(error)
                       failure_email.push(Email);
                   } else {
                        console.log(info)
                       this.status = true;
                       success_email.push(Email);
                   }
                   callback(null,this.status,Email);
               });
           },
           function(statusCode,Email,callback) {
                   console.log("Will update DB here for " + Email + " With " + statusCode);
                   callback();
           }
           ],function(){
               //When everything is done return back to caller.
               callback();
       });
   }

  new massMailer();
}
mass(["leo.huettel@gmail.com", "Leo.rockymtanglers@gmail.com"])


module.exports.mass = mass;
