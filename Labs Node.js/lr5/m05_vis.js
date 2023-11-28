const nodemailer = require('nodemailer');

function send(senderEmailAddress, receiverEmailAddress, password, message) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: senderEmailAddress,
            pass: password
        }
    });

    const mailOptions = {
        from: senderEmailAddress,
        to: receiverEmailAddress,
        subject: 'Subject of the message',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    return mailOptions;
}

module.exports = { send };

/* npm uninstall m05_XXX
npm install -g m05_XXX
npm link m05_XXX
npm unlink m05_XXX */