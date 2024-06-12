const jwt=require('jsonwebtoken');
const user=require('../Schemas/user')
const Verification=async (req,res,next)=>{
    try {
        //token se value get krna hai
        const token=req.cookies.loginToken;
        //verify token with our private key
        const verify=jwt.verify(token, process.env.PRIVATE_KEY)
        //verify variable me token ki waja se user k sara data achuka h ab hume user ki
        //id compare krwani h 
        const AuthUser = await user.findOne({_id:verify._id,"tokens.token":token})
        if(!AuthUser){throw new Error("User not Found")}

        req.token=token;
        //jab bhi hume kisi user k data chaiye hoga Authuser ki help se call krskte hn
        //q k Authuser variable k andr sara data hai
        req.AuthUser=AuthUser;
        //this has only user id
        req.userId=AuthUser._id;
        res.locals.userid= req.userId
        next()

    } catch (error) {
        res.status(401).send('Token Not Found')
        //console.log(error)
    }
}
module.exports=Verification;



  