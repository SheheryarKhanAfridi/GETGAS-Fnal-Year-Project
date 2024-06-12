const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const getBill = async (req, res, next) => {
    const { name, email, phone, subject, Message } = req.body;

    // Creating an object 'defaultsetting' containing email
    // service and authentication details
    let defaultsetting = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS
        }
    };

    // Create a transporter object using nodemailer
    let transporter = nodemailer.createTransport(defaultsetting);

    // Create an instance of Mailgen with the 'salted' theme
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'GetGas',
            link: 'https://sheheryarkhan.com'
        }
    });

    // Construct the email content using Mailgen
    let response = {
        body: {
            name: 'Admin',
            intro: 'You have received a new Query from a user. Here are the details:',
            table: {
                data: [
                    { item: 'Name', description: name },
                    { item: 'Email', description: email },
                    { item: 'Phone', description: phone },
                    { item: 'Message', description: Message }
                ]
            },
            outro: 'Please respond to the user as soon as possible.'
        }
    };

    // Generate the email HTML content
    let mail = Mailgenerator.generate(response);

    // Define the email options
    let Umessage = {
        from: EMAIL,
        to: 'sheheryarsherry90@gmail.com',
        subject: subject,
        html: mail
    };

    // Send the email
    transporter.sendMail(Umessage)
        .then(() => {
            res.status(203).json("Message sent");
            console.log('Message sent');
        })
        .catch(err => {
            res.status(403).json(err);
            console.log('Message not sent', err);
        });

    next();
};

module.exports = { getBill };
