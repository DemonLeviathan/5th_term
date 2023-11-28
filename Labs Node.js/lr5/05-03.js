const m05_VIS = require('./m05_vis');

const senderEmail = 'cyberXleviathan@gmail.com';
const senderPassword = 'jaxq yclk uyay tszq';
const recipientEmail = 'demon.leviathan.666.13.666@gmail.com';
const message = 'Hello! This is a test message.';

const sentEmail = m05_VIS.send(senderEmail, recipientEmail, senderPassword, message);

console.log('Sent email:', sentEmail);

