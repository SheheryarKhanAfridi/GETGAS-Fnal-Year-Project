const mongoose = require('mongoose');


const InspectionSchema= new mongoose.Schema({
    UserId:{
        type:String
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    Instant:{
        type:Boolean
    },
    Order_date:{
        type:Date,
        default: Date.now
    },
    time:{
        type:String
    },
    details:{
        type:String
    },
    priority:{
        type:Number
    },
    Date:{
        type:Date
    },
    Order_Id:{
        type: String,
        unique: true 
    },
    status:{
        type:Number
    },
    deleteReq:{
        type:Boolean
    }
})

InspectionSchema.pre('save', function (next) {
    this.deleteReq=false
    if (!this.Order_Id) {
        const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(4, '0'); 
        this.Order_Id = `INSPECT-${randomDigits}`; 
    }
    next();
});

const Inspection = mongoose.model('Inspection',InspectionSchema);
module.exports=Inspection;