const mongoose = require('mongoose');
const VendorShop= new mongoose.Schema({
    Vendor_id:{
        type:String
    },
    ShopName:{
        type:String
    },
    OwnerName:{
        type:String
    },
    VendorPhone:{
        type:Number
    },
    VendorAddress:{
        type:String
    },
    ImagePath:{
        type:String
    },
    CurrentPrice:{
        type:Number
    },
    City:{
        type:String
    },
    Province:{
        type:String
    },
    ZipCode:{
        type:Number
    },
    status:{
        type:Number
    },
    Reviews:[
        {
            Rating:{
                type:Number
            },
            Comment:{
                type:String
            },
            Name:{
                type:String
            },
            timestamps: {
                type: Date,
                default: Date.now,
              },
              Userid:{
                type:String
              }
        }
    ],
    TotalRating:{
        type:Number
    }

})
const Shop=mongoose.model('Shop',VendorShop)
module.exports=Shop;