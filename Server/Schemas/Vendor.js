const mongoose= require('mongoose');

const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    cpassword:{
        type:Number,
    },
    ShopStatus:{
        type:Boolean,
    },
    tokens:[
        {
            Token:{
                type:String
            }
        }
    ]
})
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;