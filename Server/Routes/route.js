const express = require('express');
const router = express.Router();
const User = require('../Schemas/user');
const userMsg=require('../Schemas/Contact')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cors = require('cors');
const Verification = require("../Middleware/Verification")
const Verify=require('../Middleware/Verify')
const cookieParser = require('cookie-parser');
const Vendor=require('../Schemas/Vendor')
const Shop= require('../Schemas/Shop');
const Order=require('../Schemas/Orders');
const Inspection = require('../Schemas/Inspection')
const {orderplace} =require('../Mail/Orderplace')
const {cancelorderMail} = require('../Mail/CancelMail')
const {InstantInspectionMail}=require('../Mail/InspectionplaceMail')
const {VendorAccpe} = require('../Mail/AdminAcceptMail')
const {VendorCancelMail}=require('../Mail/VendorCancelOrder')
const {InspectionAcceptMail}=require('../Mail/InspectionAcceptMail')
const {InspectionCancelMail}=require('../Mail/InpectionCancelbyAdminMail')
router.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
router.use(cookieParser());
const {  getBill } = require('../Mail/sendMail');
const {Response} =require('../Mail/QueryResponse')
const multer = require('multer');

router.get('/', function (req, res) {
  res.send('Hello World from the home page of router');
});

//400=error from server and 500=error from database
router.post('/register', async (req, res) => {
  const { name, email, phone, address, password, cpassword } = req.body;
  console.log(req.body)
  
  if (!name || !email || !phone || !address || !password || !cpassword) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }
   if (password !== cpassword) {
    return res.status(401).json({ error: 'Password and Confirm Password do not match' });
  }

  const Existing = await User.findOne({ $or: [{ email: email },{ phone: phone }] }); 
  if(Existing){
    return res.status(402).json('please change your email or phone number')
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const userData = await User.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      cpassword: cpassword,
      password: hashedPassword,
    });
    res.status(200).json({ error: "User Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }

});
 

// user login kr k wapis login k page pr na asake usliye hai
router.post('/Userlogin', async (req, res) => {
  const userAvailable = req.cookies['user-name']; 
  console.log(userAvailable);

  if (userAvailable) {
    res.status(400).json({ error: 'User is already logged in' });
  } else {
    res.status(200).json({error:'user not found'})
  }
});


router.post('/login', async (req, res) => {
  const { email, password} = req.body;
  
  if (!email || !password) {
    return res.status(422).json({ error: 'Please fill in all fields' });
  }

  try {
    let token;
    const Login = await User.findOne({ $or: [{ email: email }] });
    // const name=Login.name;

    if (Login) {
      console.log("User found:", Login);
      console.log("Provided password:", password);
      console.log("Stored password (hashed):", Login.password); 

      const match = await bcrypt.compareSync(password, Login.password);
      // const match = await User.findOne({ $or: [{ password: password }] });
      console.log("Password match result:", match); 

      if (match) {

        token = await Login.generateAuthtoken();
        console.log("Generated token:", token);
        res.cookie("loginToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          httpOnly: true,
        });
        res.cookie("user-name",Login.name, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          httpOnly: true,
        });
        
        
        res.json({ message: "Sign-in successful" });
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    } else {
      res.status(400).json({ error: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});



router.get('/account', Verification, (req, res)=> {
  //sending req.rootuser value in the frontend
  res.status(200).send(req.AuthUser);
})
router.get('/contactData', Verification, (req, res)=> {
  //sending req.rootuser value in the frontend
  res.send(req.AuthUser);
})
router.get('/contactDataV', Verify,async (req, res)=> {
  const data= res.locals.verifytoken
  const details= await Vendor.findOne({_id:data})
  res.status(250).send(details);
})

router.post('/sendingMail',getBill,async(req,res)=>{

})

// router.post('/contact',Verification,async(req, res)=> {
//   const contactForm=req.body;
//   if(!contactForm){
//    return res.status(402).json('Empty Data')
//   }
//   const {name,email,phone,subject,Message}=req.body;
//   if(!subject || !Message){
//     return res.status(400).json('please fill all the fields')
//   }
    
//     const userToken=req.cookies.loginToken
//     const VerifyUser=jwt.verify(userToken,process.env.PRIVATE_KEY)
//     if(!VerifyUser){
//         res.status(401).json('User is not verified')
//         return console.log('user is not Verified')
//         }
//   try {

//     // const secondmsg= await userMsg.findOne({_id: VerifyUser })
//     // if(secondmsg){
//     //   return res.status(404).json('you cant not send Second Msg With in 24 hours')
//     // }
    
//     const userData = await userMsg.create({
//       userId:VerifyUser,
//       name: name,
//       email: email,
//       phone: phone,
//       subject:subject,
//       Message:Message
//     });
//     res.status(200).json('message sent')
  
//   } catch (error) {
//     res.status(404).json('you cant not send Second Msg With in 24 hours')
//     console.log("error",error)
//   }

// })

router.post('/contact', Verification, async (req, res) => {
  const contactForm = req.body;

  if (!contactForm) {
      return res.status(402).json('Empty Data');
  }

  console.log(contactForm)
  
  const { name, email, phone, subject, Message } = req.body; 
  if (!subject || !Message) { 
      return res.status(400).json('Please fill all the fields');
  }


  try {
    const Id=res.locals.userid
      let userMs = await userMsg.findOne({ userId: Id});
      console.log(userMs)
      
      if (userMs) {
          
          userMs.messages.push({ subject, Message });
      } else {
          
          userMs = new userMsg({
              userId: Id,
              name: name,
              email: email,
              phone: phone,
              messages: [{ subject, Message }], 
              status:0
          });
      }

      
      await userMs.save();
      res.status(200).json('Message sent');
  } catch (error) {
      res.status(500).json('Error saving message');
      console.error("Error:", error);
  }
});

router.post('/EditAccountDetails',async(req,res)=>{
  const {Name,Phone}=req.body;
  if(!Name||!Phone){
    return res.status(400).json("Data is empty")
  }
  const userToken=req.cookies.loginToken;
  if(!userToken){
    return res.status(401).json("User is not Login")
  }
  const verifyuser= jwt.verify(userToken,process.env.PRIVATE_KEY);
  if(!verifyuser){
    return res.status(402).json("UnAuthorized User")
  }
  const UserData=await User.findOne({_id:verifyuser});
  if(!UserData){
    return res.status(403).json("User data not Found")
  }
  try {
    UserData.name=Name
  UserData.phone=Phone
  UserData.save();
  res.status(200).json("User Data updated")
  } catch (error) {
    console.log(error)
  }
  
})
 

router.get('/signout', (req, res)=> {
  res.clearCookie('loginToken',{path:'/'})
  res.clearCookie('user-name',{path:'/'})
  res.status(200).send('user logout')
})

router.get('/VendorLogout', (req,res)=>{
  console.log('hello logout','logout bro')
  res.clearCookie('VendorToken')
  return res.status(200).json('Vendor Logout')
})

router.get('/Navbar', (req, res) => {
  const userData = req.cookies['user-name'];
  
  if (userData) {
    res.status(200).json({ userData });
  } 
});

router.post('/Vendorregister',async (req,res)=>{
  const VendorData=req.body;
  if(!VendorData){
    return res.status(400).json('Empty Vendor Data')
  }
  const FindEmail= await Vendor.findOne({email:VendorData.email});
  if(FindEmail){
    console.log(FindEmail)
    return res.status(401).json('Email already exists')
  }
  const VendorHashedPassword= await bcrypt.hash(VendorData.password,12)
  try {
     const vendorregister= await Vendor.create({
      name:VendorData.name,
      email:VendorData.email,
      password:VendorHashedPassword,
      cpassword:VendorData.cpassword,
      ShopStatus:false
    })
    res.status(200).json('user Registered')
    console.log('user Registered')

  } catch (error) {
    console.log(error)
  }
  
})
router.post('/CHECKLOGIN',async(req,res)=>{

  const {email,password}=req.body;
  if(!email || !password){
    res.status(400).json('Empty DATA')
  }
  const VendorFind= await Vendor.findOne({email:email})
  if(VendorFind){
     const passCheck=await bcrypt.compareSync(password,VendorFind.password)
     if(passCheck){
      const id=VendorFind._id
      const userID={_id:id}
      //ye samjh nhi aya k token ko generate krwate wqt _id:id ye structure q zarrori hai
      const token=jwt.sign(userID,process.env.PRIVATE_KEY)
      VendorFind.tokens.push({Token:token})
      VendorFind.save()
      .then(()=>{
        console.log('token is saved in Database')
        res.cookie('VendorToken',token,{
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         httpOnly:true,
        })
        res.status(200).json({ message: 'User logged in successfully' });
      }).catch((error)=>{
        console.log(error)
          return res.status(403).json('Error while generating Token')
          
      })
     }else{
      console.log('Invalid Password')
      return res.status(402).json('Invalid Pass')
     }
  }
  else{
    console.log('user not found')
    return res.status(401).json('User not found')

  }

})

router.get('/checkvendor',async (req,res)=>{
  const VendorToken= req.cookies.VendorToken;
  if(VendorToken){
    const VerifiedToken= jwt.verify(VendorToken,process.env.PRIVATE_KEY);
    if(!VerifiedToken){
      return res.status(400).json('Unauthorized User')
    }
    const VendorDeatils= await Vendor.findOne({_id:VerifiedToken})
    if(!VendorDeatils){
      return res.status(401).json('Data not found')
    }
    return res.status(200).json(VendorDeatils)
  }
  else{
    return res.status(202).json('none')
  }
    
})
router.get('/VENDORORUSER',async (req,res)=>{
  const vendor=req.cookies.VendorToken;
  if(vendor){
    res.status(200).json('vendor')
  }
  else{
    res.status(201).json(User)
  } 
 
})
router.get('/checkuser',async (req,res)=>{
  const UserToken= req.cookies.loginToken;
   if(UserToken){
    const VerifiedToken= jwt.verify(UserToken,process.env.PRIVATE_KEY);
    if(!VerifiedToken){
      return res.status(400).json('Unauthorized User')
    }
    const UserDeatils= await User.findOne({_id:VerifiedToken})
    if(!UserDeatils){
      return res.status(401).json('Data not found')
    }
    return res.status(201).json(UserDeatils)
  }
  else if(!UserToken){
    return res.status(202).json('none')
  }
   
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage })

router.post('/VendorForm', Verify, upload.single('file'), async (req, res) => {
  const VendorData = req.body;
  const uploadedFile = req.file;

  if (!VendorData || !uploadedFile) {
    return res.status(400).json({ error: 'Incomplete Data' });
  }

  const vendorID = res.locals.verifytoken;
  const { shopname, ownername, vendor_phone, vendor_address, current_price, city, province, zipcode } = VendorData;

  const convertedData = {
    ...VendorData,
    vendor_phone: parseInt(vendor_phone),
    current_price: parseFloat(current_price),
    zipcode: parseInt(zipcode),
  };

  try {
    await Shop.create({
      Vendor_id: vendorID,
      ShopName: shopname,
      OwnerName: ownername,
      VendorPhone: convertedData.vendor_phone,
      VendorAddress: vendor_address,
      CurrentPrice: convertedData.current_price,
      City: city,
      Province: province,
      ZipCode: convertedData.zipcode,
      ImagePath: uploadedFile.path,
      status:1
    });

    const VendorshopStatus = await Vendor.findOne({ _id: vendorID });
    if (VendorshopStatus) {
      VendorshopStatus.ShopStatus = true;
      await VendorshopStatus.save();
    } else {
      console.log('Vendor not found');
    }

    return res.status(200).json({ message: 'Shop registered successfully' });
  } catch (error) {
    console.error('Error registering shop:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/ShopData',async (req,res)=>{
  const token = req.cookies.VendorToken;
  const verifytoken=jwt.verify(token,process.env.PRIVATE_KEY);
  const ShopData= await Shop.findOne({Vendor_id:verifytoken});
  res.status(200).send(ShopData)
  console.log(ShopData)
})

router.post('/ChekingFromShopPage',(req,res)=>{
  const token=req.cookies.loginToken;
  if(!token){
    return res.status(400).json('token not found')
  }
  else{
    return res.status(200).json('user login')
  }
})

router.post('/AllShops',async(req,res)=>{
  const ALLshop = await Shop.find({})
  if(!ALLshop){
    return res.status(400).json('Database Error')
  }
  else{
    return res.status(200).send(ALLshop)
  }
})

router.post('/shopproduct',async (req,res)=>{
  const {currentIndex}=req.body
  if(!currentIndex){
    return res.status(400).json('Error while Getting Product ID')
  }
  const shopdetails = await Shop.findOne({_id:currentIndex})
  if(!shopdetails){
    return res.status(401).json('Shop not found')
  }
  return res.status(200).json(shopdetails)
})

router.post('/CEP',async(req,res)=>{
  const data = req.body;
  const {email,phone,password,address,addressDetails,OrderKG} =data;
  const Vemail= await User.findOne({email:email});
  if(Vemail){
    const Vpassword= bcrypt.compareSync(password,Vemail.password)
    if(Vpassword){
       res.status(200).json(Vemail)
      return
    }
    else{
      res.status(400).json('Incorrect Password')
      console.log('password is not matched')
      return
    }
  }
  else{
    console.log('email is not matched')
    return res.status(401).json('incorrect email')
    
  }

})

// router.post('/placeorder',Verification,async (req,res)=>{
//   const data = req.body;
//   const userid=res.locals.userid
//    console.log(data);
//   if(!data){
//     return res.status(400).json('Empty Order Details')
//   }
//   console.log(data)
//   try {
//     const {OrderKG,email,phone,address,addressDetails,VendorId,bill,Price,name ,ShopId,ShopName} = data;
//     const Orders=await Order.create({
//       VendorId:VendorId,
//       KG:OrderKG,
//       CustomerEmail:email,
//       CustomerPhone:phone,
//       CustomerAddress:address,
//       AddressDetails:addressDetails,
//       Bill:bill,
//       Name:name,
//       Price:Price,
//       User_id:userid,
//       ShopName:ShopName,
//       ShopId:ShopId,
//       status:0
//     }).then(()=>{
//       orderplace
//     })
//     console.log('Order Placed')
//     console.log(Orders)
//     return res.status(200).json(Orders)
//   } catch (error) {
//     return console.log(error)
//   }
// })
router.post('/placeorder', Verification, async (req, res, next) => {
  const data = req.body;
  const userid = res.locals.userid;

  if (!data) {
      return res.status(400).json('Empty Order Details');
  }

  try {
      const { OrderKG, email, phone, address, addressDetails, VendorId, bill, Price, name, ShopId, ShopName } = data;
      const Orders = await Order.create({
          VendorId: VendorId,
          KG: OrderKG,
          CustomerEmail: email,
          CustomerPhone: phone,
          CustomerAddress: address,
          AddressDetails: addressDetails,
          Bill: bill,
          Name: name,
          Price: Price,
          User_id: userid,
          ShopName: ShopName,
          ShopId: ShopId,
          status: 0
      });

      console.log('Order Placed');
      console.log(Orders);
      res.locals.order = Orders; // Store the order in res.locals to access it in the next middleware
      next(); // Proceed to the orderplace middleware
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error placing order', details: error });
  }
}, orderplace, (req, res) => {
  res.status(200).json(res.locals.order);
});
router.post('/getorderforvendor',Verify,async (req,res)=>{
  const token=res.locals.verifytoken; 
  const id=token._id
  // const id=id1.toString();
  console.log(id)
  const VendorOrder= await Order.find({VendorId:id})
  console.log(VendorOrder)
  if(!VendorOrder){
    return res.status(400).json('zero Orders')
  }
  res.status(200).send(VendorOrder)
})
router.post('/EditShop',Verify,async(req,res)=>{
  const data=req.body;
  if(!data){
    return res.status(400).json('error')
  }
  const Vid=res.locals.verifytoken;
  const id=Vid._id;
  // sd=shopDetails
  const sd= await Shop.findOne({ Vendor_id:id})
  const{ShopName,OwnerName,CurrentPrice,VendorPhone,VendorAddress,City,Province,ZipCode} = data;
  try {
    sd.ShopName=ShopName;
    sd.OwnerName=OwnerName;
    sd.CurrentPrice=CurrentPrice;
    sd.VendorPhone=VendorPhone;
    sd.VendorAddress=VendorAddress;
    sd.City=City;
    sd.Province=Province;
    sd.ZipCode=ZipCode;
    sd.save();
    return res.status(200).json('Shop Updated')
  } catch (error) {
    console.log(error)
  }
  
})

router.get('/checkuserOrders',async (req,res)=>{
  try {
    const UserToken= req.cookies.loginToken;
   if(UserToken){
    const VerifiedToken= jwt.verify(UserToken,process.env.PRIVATE_KEY);
    if(!VerifiedToken){
      return res.status(400).json('Unauthorized User')
    }
    const UserDeatils= await User.findOne({_id:VerifiedToken})
    if(!UserDeatils){
      return res.status(401).json('Data not found')
    }
    else{
      //  console.log(VerifiedToken)
      // try {
      //   const userid=VerifiedToken._id
      //   console.log(userid)
      //   const OrderHistory = await Order.find({User_id:userid})
      //   return res.status(201).json(OrderHistory)
        
      // } catch (error) {
      //   console.log('error')
      // }
      return res.status(201).json(UserDeatils)
    }
    
  }
  else if(!UserToken){
    return res.status(202).json('none')
  }
    
  } catch (error) {
    console.log('error while getting user order History')
  }
   
})
router.get('/checkuserOrders2',Verification,async (req,res)=>{
  try {
    const data=res.locals.userid
    const OrderHistory = await Order.find({User_id:data})
    console.log(OrderHistory)
    return res.status(201).json(OrderHistory) 
    
  } catch (error) {
    console.log('error')
    return res.status(400).json('Error while getting order history')
  }
   
})

router.get('/userDataForInspection',Verification,(req,res)=>{
  const data=req.AuthUser;
  res.status(200).send(data)
})


router.put('/InspectionAppointment', async (req, res, next) => {
  const data = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).json('Form data not found');
  }
  
  const { Userid, name, phone, address, Description } = data;
  const user= await User.findOne({_id:Userid})
  const {email}=user
  console.log(email)
  let priority = 0;
  const instant = data.Inspection.Instant;
  
  if (instant === true) {
    priority = 1;
  }
  
  const Schedule = data.Inspection.Schedule;
  
  try {
    const appointment = await Inspection.create({
      name: name,
      phone: phone,
      address: address,
      details: Description,
      Instant: instant,
      Date: Schedule.Date,
      time: Schedule.time,
      priority: priority,
      status: 0,
      UserId: Userid
    });
    
    res.locals.appointment = appointment;
    res.locals.email = email;
    next();
  } catch (error) {
    console.log('Error while booking appointment:', error);
    return res.status(401).json('Error');
  }
}, InstantInspectionMail, (req, res) => {
  const appointment=res.locals.appointment
  res.status(200).json(appointment);
});

router.post('/historyDetails',async(req,res)=>{
  const data =req.body
  if (!data){
    return res.status(400).json('id not found')
  }
  const {id}=data
  console.log(id)
  const orderData = await Order.findOne({_id:id})
  if(!orderData){
    return res.status(401).json('shop not found')
  }
  return res.status(200).json(orderData)
 
})

router.post('/ReviewData', async (req, res) => {
  const data = req.body;
  console.log(data)
  
  if (!data) {
    return res.status(400).json({ message: 'Data not found' });
  }

  const { ShopId, Name, Rating, Comment, UserId, OrderId } = data;
  console.log(UserId,'user from frontend')

  try {
    // Find the shop by its ID
    const shop = await Shop.findOne({ _id: ShopId });
    console.log(shop)
    if (!shop) {
      return res.status(401).json({ message: 'Shop not found' });
    }

    // Check if the user has already submitted a review for this shop
    const existingReview = shop.Reviews.find((review) => review.Userid == UserId);
    // console.log(existingReview)
    if (existingReview) {
      return res.status(403).json({ message: 'User has already submitted a review for this shop' });
    }
    
    // Add the new review to the shop's Reviews array
    const newReview = {
      Rating: Rating,
      Comment: Comment,
      Name: Name,
      Userid: UserId,
      OrderId: OrderId
    };

    shop.Reviews.push(newReview);
    const totalRating = shop.Reviews.reduce((sum, review) => sum + review.Rating, 0) / shop.Reviews.length;
    shop.TotalRating = totalRating;
    console.log(totalRating,'totalRating')
    await shop.save();

    return res.status(200).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/AdminInspection',async(req,res)=>{
    const data=await Inspection.find({})
    if(!data){
      return res.status(400).json('empty data')
    }
    return res.status(200).json(data)
})
router.post('/InspectiondetailsofUser',async(req,res)=>{
  const data=req.body;
  if(!data){
    return res.status(400).json('empty Data')
  }
  const User=await Inspection.findById({_id:data.currentIndex})
  if(!User){
    return res.status(401).json('User Data not found')
  }
  console.log(User)
  return res.status(200).json(User)
})
router.get('/QueryData',async(req,res)=>{
  const data=await userMsg.find({})
  if(!data){
    return res.status(400).json('Empty Data')
  }
  return res.status(200).json(data)
})
router.get('/GetAllUser',async(req,res)=>{
  const data=await User.find({})
  if(!data){
    return res.status(400).json('Empty Data')
  }
  return res.status(200).json(data)
})
router.get('/GetAllVendor-admin',async(req,res)=>{
  const data=await Vendor.find({})
  console.log(data)
  if(!data){
    return res.status(400).json('Empty Data')
  }
  return res.status(200).json(data)

})
router.post('/GetVendorShopAdmin',async(req,res)=>{
  const data=req.body
  if(!data){
    return res.status(400).json('Empty Data get from frontend')
  }
  const id=data.FindShop;
  const shopData = await Shop.findOne({Vendor_id:id});
  console.log(shopData)
  
  if(!shopData){
    return res.status(401).json('Shop not found')
  }
  return res.status(200).json({shopData})

})
router.post('/DeleteUserAdminRequest',async(req,res)=>{
  const data=req.body
  if(!data){
    return res.status(400).json('Data not found')
  }
  const {email,phone,name} =data
  const Userdata = await User.findOne({email:email})
  if(!Userdata){
    return res.status(401).json('Data not found in Database')
  }
  else{
    await Userdata.deleteOne()
    return res.status(200).json('User Deleted')
  }
})

router.post('/UpdateUserAdminRequest',async(req,res)=>{
  const data=req.body
  if(!data){
    return res.status(400).json('Data not found')
  }
  const {email,phone,name} =data
  const Userdata = await User.findOne({email:email})
  if(!Userdata){
    return res.status(401).json('Data not found in Database')
  }
  else{
    Userdata.name=name;
    Userdata.email=email;
    Userdata.phone=phone;
    Userdata.save();
    return res.status(200).json('Data updated')
  }
})

router.post('/InspectionCheck',async(req,res)=>{
  const data=req.body
  console.log(data)
  const id=data.currentIndex
  if(!id){  
    return res.status(400).json('User id not found')
  }
  const Request= await Inspection.find({UserId:id})
  if(!Request){
    return res.status(401).json('Request not found in database')
  }
  return res.status(200).json(Request)
})
router.post('/UpdatesShopDataByAdmin', async (req, res) => {
  const data = req.body;
  if (!data || !data.editableShopData) {
    return res.status(400).json('Empty data or missing editableShopData');
  }
  
  try {
    const shop = data.editableShopData;
    const shopDetails = await Shop.findOne({ _id: shop._id });
    if (!shopDetails) {
      return res.status(401).json('Shop not found');
    }

    const { ShopName,OwnerName, VendorPhone, VendorAddress, CurrentPrice, City, Province, ZipCode } = shop;

    shopDetails.VendorPhone = VendorPhone;
    shopDetails.ShopName = ShopName;
    shopDetails.VendorAddress = VendorAddress;
    shopDetails.CurrentPrice = CurrentPrice;
    shopDetails.City = City;
    shopDetails.ZipCode = ZipCode;
    shopDetails.Province = Province;
    shopDetails.OwnerName = OwnerName;

    await shopDetails.save();
    
    return res.status(200).json('Shop Data Updated');
  } catch (error) {
    console.log('Something went wrong:', error);
    return res.status(500).json('Internal server error');
  }
});

router.post('/DeleteShopDataByAdmin', async (req, res) => {
  const { shopId } = req.body;
  console.log(shopId)
  
  try {
    const deletedShop = await Shop.findByIdAndDelete({_id:shopId});
    console.log(deletedShop)
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
     res.status(200).json({ message: 'Shop deleted successfully' });
     const user= deletedShop.Vendor_id
     const userdata= await Vendor.findOne({_id:user})
     userdata.ShopStatus=false
     userdata.save();
     return
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/deleteVendorByAdmin', async (req, res) => {
  const { shopId } = req.body;
  console.log(shopId)
  
  try {
    const deletedShop = await Vendor.findByIdAndDelete({_id:shopId});
    console.log(deletedShop)
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// router.post('/acceptInspectionReq',async(req,res)=>{
//   const data=req.body;
//   if(!data){
//     return res.status(400).json('empty Data')
//   }
//   const User=await Inspection.findById({_id:data.currentIndex})
//   if(!User){
//     return res.status(401).json('User Data not found')
//   }
//   console.log(User)
//   User.status=1
//   User.save()
//   return res.status(200).json('Request accepted')
// })
router.post('/acceptInspectionReq', async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json('Empty data');
  }

  try {
    const Userss = await Inspection.findById({ _id: data.currentIndex });
    if (!Userss) {
      return res.status(401).json('User data not found');
    }
    const {UserId}=Userss
    const emailuser=await User.findOne({_id:UserId})
    console.log(Userss);
    Userss.status = 1;  
    const {email}=emailuser
    await Userss.save();

    // Store necessary details in res.locals to access them in the middleware
    res.locals.User = Userss;
    res.locals.email = email;

    next(); // Proceed to the sendAcceptanceMail middleware
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}, InspectionAcceptMail, (req, res) => {
  res.status(200).json('Request accepted and acceptance email sent successfully');
});
router.post('/DeleteStaatusinspection', async (req, res, next) => {
  const data = req.body;
  if (!data ) {
    return res.status(400).json('Empty data or email not provided');
  }

  try {
    const Users = await Inspection.findById({ _id: data.currentIndex });
    if (!Users) {
      return res.status(401).json('User data not found');
    }
    const {UserId}=Users
    const emailuser=await User.findOne({_id:UserId})
    const {email}=emailuser
    console.log(Users);
    Users.status = 2;
    await Users.save();
    res.locals.User = Users;
    res.locals.email = email;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}, InspectionCancelMail, (req, res) => {
  res.status(200).json('Request deleted and email sent successfully');
});

router.delete('/DeleteInspectionRequest', async (req, res) => {
  const data = req.body;
  console.log(data)
  if(!data){
    return res.status(400).json('Empty Data')
  }
  console.log('Received delete request for ID:', data.deleteId);
  const id=data.deleteId
  // Add your deletion logic here
  const request= await Inspection.findOne({Order_Id:id})
  if(!request){
    return res.status(401).json('Request not found')
  }
  request.deleteReq=true
  const final =await request.save();
  console.log(final)
 return res.status(200).json({ message: 'Delete request processed', deleteId: data.deleteId });
});

// router.post('/DeleteOrderRequest',async(req,res,next)=>{
//   const data=req.body
//   console.log(data)
//   const {ShopId,VendorId,UserId,OrderId} = data
//   if (!ShopId || !VendorId || !UserId || !OrderId){
//     return res.status(400).json('Empty data from frontend')
//   }
//   const Orderdata= await Order.findOne({Order_Id:OrderId})
//   if(!Orderdata){
//     return res.status(401).json('shop not found')
//   }
//   Orderdata.status=3
//   const orderUpdate=await Orderdata.save()
//   console.log(orderUpdate)
//   return res.status(200).json('Order updated','Order Updated',orderUpdate)
 
// })

router.post('/DeleteOrderRequest', async (req, res, next) => {
  const data = req.body;
  console.log(data);
  
  const { ShopId, VendorId, UserId, OrderId } = data;
  if (!ShopId || !VendorId || !UserId || !OrderId) {
    return res.status(400).json('Empty data from frontend');
  }

  try {
    const Orderdata = await Order.findOne({ Order_Id: OrderId });
    if (!Orderdata) {
      return res.status(401).json('Order not found');
    }

    Orderdata.status = 3;
    const orderUpdate = await Orderdata.save();
    console.log(orderUpdate);

    res.locals.deletedOrder = Orderdata;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
 }, cancelorderMail, (req, res) => {
  res.status(200).json({ message: 'Order updated and cancellation email sent successfully' });
});

// router.post('/CancelOrderReq',async(req,res)=>{
//   const data=req.body
//   const {Order_Id} =data
//   const shop= await Order.findOne({Order_Id:Order_Id})
//   console.log(shop)
//   shop.status=2
//   shop.save()
//   return res.status(200).json('Order Cancel')
// })
router.post('/CancelOrderReq', async (req, res, next) => {
  const data = req.body;
  const { Order_Id} = data;

  if (!Order_Id ) {
      return res.status(400).json({ error: 'Order Id or email not provided' });
  }

  try {
      const shop = await Order.findOne({ Order_Id: Order_Id });
      
      if (!shop) {
          return res.status(404).json({ error: 'Order not found' });
      }

      shop.status = 2;
      await shop.save();
      res.locals.shop = shop;
      next();
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}, VendorCancelMail, (req, res) => {
  res.status(200).json({ message: 'Order cancelled and cancellation email sent successfully' });
});
// router.post('/AcceptOrderReq',async(req,res)=>{
//   const data=req.body
//   const {Order_Id} =data
//   const shop= await Order.findOne({Order_Id:Order_Id})
//   console.log(shop)
//   shop.status=1
//   shop.save()
//   return res.status(200).json('Order Accepted')
// })
router.post('/AcceptOrderReq', async (req, res, next) => {
  const data = req.body;
  const { Order_Id } = data;
  if (!Order_Id ) {
      return res.status(400).json({ error: 'Order Id or email not provided' });
  }

  try {
      const shop = await Order.findOne({ Order_Id: Order_Id });
      if (!shop) {
          return res.status(404).json({ error: 'Order not found' });
      }

      shop.status = 1;
      await shop.save();

      // Store necessary details in res.locals to access them in the middleware
      res.locals.shop = shop;

      next(); // Proceed to the accptreq middleware
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}, VendorAccpe, (req, res) => {
  res.status(200).json({ message: 'Order accepted and confirmation email sent successfully' });
});
router.post('/DeliveredUpdate',async(req,res)=>{
  console.log('hello')
  const data=req.body;
  if(!data){
    return res.status(400).json('empty data')
  }
  const {status,Order_Id}=data.orderDetails
  const shop= await Order.findOne({Order_Id:Order_Id})
  shop.status=4
  shop.save();
  return res.status(200).json('Order Updated')
})

router.post('/DeleteOrderReq', async (req, res) => {
  const { Order_Id } = req.body;
  if (!Order_Id) {
    return res.status(400).json({ error: 'Order Id not provided' });
  }
  try {
    await Order.findOneAndDelete({ Order_Id });
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/CloseReq',async(req,res)=>{
  const data=req.body
  if(!data){
    return res.status(400).json('empty response')
  }
  const shop= await Shop.findOne({_id:data._id})
  shop.status=1
  shop.save()
  console.log(shop,'final data')
  return res.status(200).json('Updated')
})
router.post('/LiveReq',async(req,res)=>{
  const data=req.body
  if(!data){
    return res.status(400).json('empty response')
  }
  const shop= await Shop.findOne({_id:data._id})
  // console.log(shop)
  shop.status=0
  const finaldetails=shop.save()
  console.log(finaldetails,'after updated shop')
  return res.status(200).json('Updated')
})

router.post('/sendResponse', Response, async (req, res) => {
  const data = req.body;
  const { userId } = data;
  try {
      const allmesg = await userMsg.findOneAndDelete({ userId: userId });
      console.log(allmesg);
      res.status(200).json('Sent');
  } catch (error) {
      res.status(500).json({ error: 'Failed to process request', details: error });
      console.log('Error in processing request', error);
  }
});

router.post('/adminLogin',async(req,res)=>{
  const data=req.body
  const {email}=data

    let token = jwt.sign({email:email},process.env.PRIVATE_KEY)
        console.log("Generated token:", token);
        res.cookie("admin", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
          httpOnly: true,
        });
        if(token){
        res.status(200).json({ message: "Sign-in successful" });
        return 
        }
  
})

router.post('/adminlogout', (req, res) => {
  res.clearCookie('admin');
  res.status(200).json({ message: 'Admin logged out successfully' });
});


router.get('/CheckAdminLoginorNot',(req,res)=>{
  const adminToken = req.cookies['admin'];
  if(adminToken){
    console.log(adminToken)
    return res.status(200).json('admin login')
  }
  else{
    console.log(adminToken)
    return res.status(400).json('token not found')
  }
})
router.post('/DeleteShopFromVendor',async(req,res)=>{
  const data=req.body
  const {id}=data
  console.log(data.id)
  const shopdata= await Shop.findOneAndDelete({_id:id})
  return res.status(200).json('shop deleted')
})






module.exports = router;





