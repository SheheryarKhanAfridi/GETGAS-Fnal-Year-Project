const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const orderplace = async (req, res, next) => {
    const data = req.body;
    const { OrderKG, email, phone, address, bill, Price, name, ShopName } = data;
    const {Order_Id,Order_date} =res.locals.order

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
            intro: 'Your order has been placed . Here are the details of your order:',
            table: {
                data: [
                    { item: 'Order Id', description: Order_Id},
                    { item: 'Client Name', description: name },
                    { item: 'Shop Name', description: ShopName },
                    { item: 'Phone', description: phone },
                    { item: 'Address', description: address },
                    { item: 'Price (per KG)', description: Price },
                    { item: 'Total KG', description: OrderKG },
                    { item: 'Total Price', description: bill },
                    { item: 'date', description: Order_date }
                ]
            },
            outro: 'Please wait for the vendor approval'
        }
    };

    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: email,
        subject: 'Order has been placed successfully',
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

module.exports = { orderplace };

