const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type:String,
        require:[true, "Please add a name"]
    },
    email: {
        type:String,
        require:[true, "Please add a Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter valid email"
        ]
    },

    password: {
        type:String,
        require:[true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
       // maxLength: [23, "Password must be up to 23 characters"]
    },
    photo: {
        type:String,
        require:[true, "Please add a password"],
        default: "https://www.freepik.com/free-photos-vectors/png"
    },
    phone: {
        type:String,
        default: "+94"
    },
    bio: {
        type:String,
        maxLength: [250, "bio must be more"],
        default: "bio"
    }
}, 
{
    timeStamps: true,
});

//Encrypt password before saving to DB
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next()
    }

    //Hash Password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password= hashedPassword;
    next()

})


const User = mongoose.model("User", userSchema)
module.exports = User