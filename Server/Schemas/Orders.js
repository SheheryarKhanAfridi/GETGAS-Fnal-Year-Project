const mongoose = require('mongoose');

const Orderschema = new mongoose.Schema({
    VendorId: {
        type: String
    },
    KG: {
        type: Number
    },
    CustomerEmail: {
        type: String
    },
    CustomerPhone: {
        type: Number
    },
    CustomerAddress: {
        type: String
    },
    AddressDetails: {
        type: String
    },
    Bill: {
        type: Number
    },
    Name: {
        type: String
    },
    Price: {
        type: Number
    },
    User_id: {
        type: String
    },
    Order_Id: {
        type: String,
        unique: true 
    },
    Order_date: {
        type: Date,
        default: Date.now
    },
    ShopName: {
        type: String
    },
    ShopId:{
        type: String
    },
    status:{
        type:Number
    }
});

Orderschema.pre('save', function (next) {
    // Check if Order_Id is not already set
    if (!this.Order_Id) {
        const randomDigits = Math.floor(Math.random() * 100).toString().padStart(6, '0'); // Generate 3 random digits
        this.Order_Id = `ORD-${randomDigits}`; // Custom order number format
    }
    next();
});


const Order = mongoose.model('Order', Orderschema);
module.exports = Order;
