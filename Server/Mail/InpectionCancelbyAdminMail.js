const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const InspectionCancelMail = async (req, res, next) => {
    const data = res.locals.User;
    const { phone, name, Instant, Date, time , Order_Id } = data;
    const email = res.locals.email;

    // Log email to ensure it is valid
    console.log('Email to send:', email);

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
            intro: 'Your Request has been Cancelled by admin. Here are the details of your order:',
            table: {
                data: [
                    { item: 'Name', description: name },
                    { item: 'Order Id', description: Order_Id },
                    { item: 'Phone', description: phone },
                    { item: 'Instant', description: Instant },
                    { item: 'Date', description: Date },
                    { item: 'Time', description: time }
                ]
            },
            outro: 'We are sorry but your request has been cancelled by admin. Please try again later'
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: email,
        subject: 'Inspection Request has been Cancel by Vendor due to technical reasons',
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

module.exports = { InspectionCancelMail };
