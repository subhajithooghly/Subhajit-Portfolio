require('dotenv').config();
const express = require('express');
const path = require("path");
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.get('/index', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.post("/", async(req, res) => {
    const transpoter = nodemailer.createTransport({
        // service: 'gmail',
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth: {
            user: 'subhajitghoshofficial10@gmail.com',
            pass: 'Subhajit123@',
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: 'subhajitghoshofficial10@gmail.com',
        subject: `Our Company:${req.body.name}  Message from: ${req.body.email}    Contact: ${req.body.subject}`,
        text: req.body.message,
    }

    transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error');
            res.send('error');
        } else {
            console.log('Email Send');
            res.send('Success');
        }

    })
});