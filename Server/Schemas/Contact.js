const mongoose = require('mongoose');

const contactMsgSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    messages: [
        {
            subject: {
                type: String,
                required: true
            },
            Message: {
                type: String,
                required: true
            }
        }
    ],
    status:{
        type:Number
    }
});

const UserMsg = mongoose.model('UserMsg', contactMsgSchema);

module.exports = UserMsg;
