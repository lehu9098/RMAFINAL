const fs = require('fs')
var emailArray = ['leo.huettel@gmail.com', 'lehu9098@colorado.edu'];
const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyBj8sGnQDNhtgECit1iHnmvVlyZE4patbw',
  authDomain: 'rocky-mt.firebaseapp.com',
  projectId: 'rocky-mt'
});

var db = firebase.firestore();


fs.readFile('./mailchimp.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    var emails = JSON.parse(jsonString);
    emails.forEach((email) => {
      db.collection('emailSubscribers').add({email: email['Email Address']});
    })
    
})
