const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Your Express routes and nodemailer setup will go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password' // Replace with your email password or app password
    }
  });
  
  app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: 'samuelkim019@gmail.com', // Replace with the email you want to receive messages on
      subject: `New message from ${name}`,
      text: message
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Sent');
      }
    });
  });
  