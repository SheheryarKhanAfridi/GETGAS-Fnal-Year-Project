const jwt = require('jsonwebtoken');
const Vendor=require('../Schemas/Vendor')
const Shop= require('../Schemas/Shop');
const Verify=async(req,res,next)=>{
    try {
  const token = req.cookies.VendorToken;
  if(!token){
    return res.status(401).json('Please Login')
  }

  const verifytoken=jwt.verify(token,process.env.PRIVATE_KEY);
  if(!verifytoken){
    return res.status(402).json('UnAuthorized User')
  }

  const findVendor= await Vendor.findOne({_id:verifytoken})
  if(!findVendor){
    return res.status(403).json('Vendor Data not found')
  }
  res.locals.verifytoken = verifytoken;
  
  } catch (error) {
    console.log(error)
  }







  next()

}
module.exports=Verify;