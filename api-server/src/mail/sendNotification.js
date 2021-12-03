const nodemailer = require('nodemailer');

exports.sendNotification = (email, titulo, info) => { 
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const output = `
        <h3>${titulo}</h3>
        <p>${info}</p>` 

    // Message object
    let message = {
        from: `"Cadeado Eletronico" <${process.env.EMAIL_USER}>`,
        // Comma separated list of recipients
        to: email, 
    
        // Subject of the message
        subject: titulo, 
    
        // plaintext body
        text: `${titulo} \n${info}`,
    
        html: output
    };
    
    transporter.sendMail(message, (err, info) => {
        if (err) { 
            return console.log(err); 
        }
        console.log('Message sent: %s', info.messageId);
    });
}