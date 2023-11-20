const http = require('http');
const nodemailer = require('nodemailer');
const readlineSync = require('readline-sync');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`
    <form method="post" action="/sendEmail">
      <label for="fromEmail">Sender's Email:</label><br>
      <input type="email" id="fromEmail" name="fromEmail"><br><br>
      
      <label for="toEmail">Receiver's Email:</label><br>
      <input type="email" id="toEmail" name="toEmail"><br><br>
      
      <label for="message">Message:</label><br>
      <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>
      
      <input type="submit" value="Send">
    </form>
  `);
    response.end();
});

server.on('request', (request, response) => {
    if (request.method === 'POST' && request.url === '/sendEmail') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const formData = new URLSearchParams(body);
            const fromEmail = formData.get('fromEmail');
            const toEmail = formData.get('toEmail');
            const message = formData.get('message');

            sendEmail(fromEmail, toEmail, message);
            response.end('Email Sent!');
        });
    }
});

function sendEmail(fromEmail, toEmail, message) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cyberXleviathan@gmail.com',
            pass: 'jaxq yclk uyay tszq'
        }
    });

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: 'Test message',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            console.log('Sending message error');
        } else {
            console.log('Email is sent: ' + info.response);
            console.log('List was sent successful');
        }
    });
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
