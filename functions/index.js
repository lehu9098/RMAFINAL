const functions = require('firebase-functions');
const admin = require('firebase-admin');
const https = require('https');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
var Twitter = require('twitter');
var async = require("async");
const website = "https://rockymtanglers.com/"

admin.initializeApp();
//to be able to use the function we declare it .addAdmin and then we called onCall(() it runs the code within the function
//data = the date we are looking into/sending witht he user
// Context = contains authentification information of the user that has made this the call
exports.addAdminRole = functions.https.onCall((data, context) => {
//get user and add custom claim (admin)
  if(context.auth.token.admin !== true)
  {
    return {error: "Only Admins can create admins"}
  }
  else{

  return admin.auth().getUserByEmail(data.email).then(user => //method get us user and all info
  {
    return admin.auth().setCustomUserClaims(user.uid, { //the stuff inside brackets is the claims we want to add/change
      admin: true
    })
  }).then(() => {
    return {
      message: 'Success!'
    }
  }).catch(err =>
  {
    return err;
  })
}

});

exports.deleteAdminRole = functions.https.onCall((data, context) => {
//get user and add custom claim (admin)
  if(context.auth.token.admin !== true)
  {
    return {error: "Only Admins can create admins"}
  }
  else{

  return admin.auth().getUserByEmail(data.email).then(user => //method get us user and all info
  {
    return admin.auth().setCustomUserClaims(user.uid, { //the stuff inside brackets is the claims we want to add/change
      admin: false
    })
  }).then(() => {
    return {
      message: 'Success!'
    }
  }).catch(err =>
  {
    return err;
  })
}

});

exports.getuserID = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => //method get us user and all info
    {
      const userInfo = user //could get everything about that user and do stuff to it
      return userInfo;
    })


});

exports.sendMail = functions.https.onCall((data, context) => {

  var transporter = nodemailer.createTransport({
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
  });

  var mailOptions = {
    from: 'info@rockymtanglers.com',
    to: data.email,
    subject: data.info.Subject,
    html: '<div style="background-color:#b2801a; display: inline-block;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FEmailTitle.png?alt=media&token=8246f3ec-c89e-420d-bd06-a15bb150e7d0" width="100%" height="auto"/><h1 style="color:lightgrey; text-align:center;">'+data.info.title+'</h1><b><p style="text-align:center;">'+ data.info.body +'</p></b><p style="text-align:center;">Call the shop for up to date information on our local waters 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center;">Check Out Our Site for Updates!</a></div>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      return
      {
        e
      }

    }

  });
});

exports.sendEventConfirmation = functions.https.onCall((data, context) => { //for events and classes
  var transporter = nodemailer.createTransport({
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
  });

  var mailOptions = {
    from: 'info@rockymtanglers.com',
    to: data.email,
    subject: "Confirm Event Attendance",
    html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">Thanks for signing up for an event with Rocky Mountain Anglers</h2><b><p style=" color: black; text-align:center;">In order to reserve your spot you must confirm your attendance with the link bellow</p></b><p style="text-align:center; color:black;">Call the shop for other questions or concerns at 303-447-2400<p><a href="'+ website + data.dbName + '/' + data.eventID + '/' + data.id +'/' + data.date + '/' + data.time + '/' + data.title + '/' + data.email + '" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Comfirm Attendance Now!</a></div>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      return
      {

      }

    }

  });
});

exports.sendKidsCampInquiry = functions.https.onCall((data, context) => { //for kids camp
  var transporter = nodemailer.createTransport({
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
  });

  var mailOptions = {
    from: 'info@rockymtanglers.com',
    to: 'info@rockymtanglers.com',
    subject: "Kids Camp Inquiry",
    html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;"> Kids Camp Inquiry </h2><p style=" color: black; text-align:center;"><b>Parent Name: </b>'+ data.parentName +'<br/><b> Parent Email: </b>'+ data.parentEmail+'<br/><b>Parent Phone: </b>'+ data.parentPhone +'<br/><b>Child Name: </b>'+ data.childName +'<br/><b>Child Age: </b>'+ data.childAge +'<br/><b>Child Gender: </b>'+ data.gender+'<br/><b>Health Conditions: </b>'+ data.healthConditions +'<br/><b>Child Camp History: </b>'+ data.history +'<br/></p></b></div>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      return
      {

      }

    }

  });
});

exports.tweet = functions.https.onCall((data, context) => {

  var client = new Twitter({
    consumer_key : 'kgpMMv7e2OX8OE58UurYssqx0',
    consumer_secret : 'qUgN4dRa7SnQOJgpO3M1pfGEJev9rC8pSW66WflOEcGSf8afc5',
    access_token_key : '1274751567866912768-PY2gea79NZQhWGKT6RWIWjR47pK1kQ',
    access_token_secret : 'DSuM8oRy9zHTkXTxp5sGmOt5fOplxjbFx31FOrGJvn992',
  });

  client.post('statuses/update', {status: data.tweet})
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  })
});

exports.sendEmailWelcome = functions.https.onCall((data, context) => { //for email subscribers on the home page
  var transporter = nodemailer.createTransport({
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
  });

  var mailOptions = {
    from: 'info@rockymtanglers.com',
    to: data.email,
    subject: data.info.Subject,
    html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">'+ data.info.title + '</h2><b><p style=" color: black; text-align:center;">'+ data.info.body + '</p></b><p style="text-align:center; color:black;">Call the shop for up to date information on our local waters 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Check Out Our Site for Updates!</a></div>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      return
      {
        e
      }

    }

  });
});

exports.sendMass = functions.https.onCall((data, context) => { //for email blasts


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
                 subject: data.info.Subject,
                 html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">'+ data.info.title + '</h2><b><p style=" color: black; text-align:center;">'+ data.info.body + '</p></b><p style="text-align:center; color:black;">Call the shop for up to date information on our local waters 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Check Out Our Site for Updates!</a></div>'
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
  mass(data.emails) //works with normal emails

});

exports.sendConfirmation = functions.https.onCall((data, context) => { //for secondary confirmation
  var transporter = nodemailer.createTransport({
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
  });

  var mailOptions = {
    from: 'info@rockymtanglers.com',
    to: data.email,
    subject: "Event Confirmed",
    html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">Congrats, you have confirmed your spot at '+ data.title+'! We will see you at Rocky Mountain Anglers on '+ data.date+' at, '+data.time+'</h2><p style="text-align:center; color:black;">Call the shop with any other questions or concerns at 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Return to Rocky Moutain Anglers</a></div>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      return
      {

      }

    }

  });
});

exports.sendReminder = functions.https.onCall((data, context) => { //for email blasts

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
                   subject: "Event Reminder",
                   html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">This is a reminder that you have signed up for '+ data.title + '</h2><b><p style=" color: black; text-align:center;">The event is scheduled for '+ data.date + ' at, '+ data.time+ '.</p></b><p style="text-align:center; color:black;">Call the shop for up to date information on our local waters 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Check Out Our Site for Updates!</a></div>'
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
  mass(data.emails) //works with normal emails
});

exports.sendDelete = functions.https.onCall((data, context) => { //for email blasts

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
                   subject: "Event Deleted",
                   html: '<div style="border-top: 1px solid black; border-bottom: 1px solid black; display: inline-block; width:100%;"><img src="https://firebasestorage.googleapis.com/v0/b/rocky-mt.appspot.com/o/EmailImages%2FRMA-logo-flat%20cut.jpeg?alt=media&token=c8271032-a3bf-444b-a448-f6db9c5699e6" width="50%" height="20%" style="margin-left:25%; margin-top: 15px;"><h2 style="padding-top: 10px; color:black; text-align:center; border-top: 1px solid black;">This is a notification that the event you have signed up for '+ data.title + ', has been deleted. This may be because of a variety of reasons. </h2><b><p style=" color: black; text-align:center;">Call Rocky Mountain Anglers for any questions or concerns pertaining to this event. You may also want to check our site for updates-changes to your events time and or location.</p></b><p style="text-align:center; color:black;">Call the shop for up to date information on our local waters 303-447-2400<p><a href="'+website+'" style="text-decoration:none; color: white; padding: 10px; background-color: grey; display: block; text-align:center; border: 1px solid black; ">Check Out Our Site for Updates!</a></div>'
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
  mass(data.emails) //works with normal emails
});
