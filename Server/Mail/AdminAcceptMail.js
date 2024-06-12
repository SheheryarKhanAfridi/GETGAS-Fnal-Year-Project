const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const VendorAccpe = async (req, res, next) => {
    const data = res.locals.shop;
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
            intro: 'Your order has been Acccepted By Vendor.',
            table: {
                data: [
                    { item: 'Order Id', description: Order_Id},
                    { item: 'Phone', description: CustomerPhone },
                ]
            },
            outro: 'See you soon with new orders'
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: CustomerEmail,
        subject: 'Order has been Approve by vendor',
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

module.exports = { VendorAccpe };

