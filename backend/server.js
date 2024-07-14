const dotenv = require("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path");
// const cloudinary = require("cloudinary").v2;


const app= express()
const PORT = process.env.PORT || 5000;


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://pinvent-app-frontends.vercel.app/", "https://66935ec3b61ecdbc3cf3c1ad--rococo-madeleine-1bedfb.netlify.app/" ],
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Route Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);



//Routes
app.get("/", (req,res) =>{
    res.send("Home Page");
})


//Error MiddlewARE

app.use(errorHandler);

//Connect to DB and start server
mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`Server Running on Port ${PORT}`)
                })
            })
            .catch((err)=>console.log(err))