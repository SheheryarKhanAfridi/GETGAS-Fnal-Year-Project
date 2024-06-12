const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const Response = async (req, res, next) => {
    const data = req.body;

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
            name: data.name,
            intro: data.Details,
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: data.email,
        subject: data.ADMINsubject,
        html: mail
    };

    try {
        await transporter.sendMail(Umessage);
        console.log('Message sent');
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        res.status(403).json({ error: 'Message not sent', details: err });
        console.log('Message not sent', err);
    }
};

module.exports = { Response };
