const mongoose=require('mongoose');
const Passwordhash=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },Date:{
        type:Date,
        default:Date.now()
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})

userSchema.methods.generateAuthtoken = async function (){
    try {
        let token = jwt.sign({_id:this._id},process.env.PRIVATE_KEY)
        this.tokens=this.tokens.concat({token : token})
         await this.save();
         return token;
    } catch (error) {
        console.log(error)
    }
}



const User=mongoose.model('User',userSchema)
module.exports=User;