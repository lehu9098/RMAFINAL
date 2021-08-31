var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Leo.rockymtanglers@gmail.com',
      pass: 'Strange12!'
    }
  });

  var mailOptions = {
    from: 'leo.rockymtanglers@gmail.com',
    to: 'leo.rockymtanglers@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: {path: './components/emailer.vue'}
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

module.exports;
