const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const InstantInspectionMail = async (req, res, next) => {
    const data= res.locals.appointment
    const {phone,name,Instant,address,Date,time}=data
    const email=res.locals.email;
    

    let defaultsetting = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS
        }
    };

    let transporter = nodemailer.createTransport(defaultsetting);

    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'GetGas',
            link: 'https://sheheryarkhan.com'
        }
    });

    let response = {
        body: {
            name: name,
            intro: 'Your Request has been placed. Here are the details of your order:',
            table: {
                data: [
                    { item: 'Name', description: name},
                    { item: 'Phone', description: phone },
                    { item: 'Instant', description: Instant },
                    { item: 'Date', description: Date },
                    { item: 'Time', description: time },
                    
                ]
            },
            outro: 'Our team will contact you in a while'
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: email,
        subject: 'Inspection Request has been place successfully',
        html: mail
    };

    try {
        await transporter.sendMail(Umessage);
        console.log('Message sent');
        next(); // Call next() to pass control to the next middleware or route handler
    } catch (err) {
        console.log('Message not sent', err);
        res.status(500).json({ error: 'Failed to send email', details: err });
    }
};

module.exports = { InstantInspectionMail };

