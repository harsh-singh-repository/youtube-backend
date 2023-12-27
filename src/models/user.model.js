import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        lowercase:true,
        trim: true,
        index:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim: true,
    },
    fullName:{
        type:String,
        required:[true,"Email is required"],
        trim: true,
        index:true,
    },
    avatar:{
        type:String, //Cloudnary URL
        required:[true,"Avatar is required"],
    },
    coverImage:{
        type: String,// Cloudinary URL
    },
    watchHistory:[
        {
           type: Schema.Types.ObjectId,
           ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String
    },
},{
    timestamps:true
});


userSchema.pre("save",async function(next){
      if(!this.isModifed("password")) return next()

      this.password = bcrypt.hash(this.password,10)
      next();
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName
    },
       process.env.ACCESS_TOKEN_SECRET,{
           expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       }
    )
};

userSchema.methods.generateRefereshToken = async function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName
    },
       process.env.REFRESH_TOKEN_SECRET,{
           expiresIn:process.env.REFRESH_TOKEN_EXPIRY
       }
    )
};

export const User = new mongoose.Model("User",userSchema);