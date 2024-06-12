const multer = require('multer');
const express = require('express');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const GettingImage=(req,res,next)=>{
    const upload = multer({ dest: 'VendorImages/' })

try {
    const file = req.file;
    console.log(file)
    
} catch (error) {
    console.log(error)
}
next();
}

module.exports = GettingImage;