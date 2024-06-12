const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const cancelorderMail = async (req, res, next) => {
    const data = res.locals.deletedOrder;
    const {CustomerEmail,CustomerPhone,Order_Id,Name}=data

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
            name: Name,
            intro: 'Your order has been Cancelled. Here are the details of your order:',
            table: {
                data: [
                    { item: 'Order Id', description: Order_Id},
                    { item: 'Phone', description: CustomerPhone },
                ]
            },
            outro: 'See you soon'
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: CustomerEmail,
        subject: 'Order has been Cancel successfully',
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

module.exports = { cancelorderMail };

