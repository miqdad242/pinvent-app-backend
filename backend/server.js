// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const userRoute = require("./routes/userRoute");
// const productRoute = require("./routes/productRoute");
// const contactRoute = require("./routes/contactRoute");
// const errorHandler = require("./middleWare/errorMiddleware");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// // const cloudinary = require("cloudinary").v2;

// const app = express();
// const PORT = process.env.PORT || 5000;

// // cloudinary.config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // Middlewares
// app.use(cors({
//     origin: ["http://localhost:3000", "https://pinvent-app-frontends.vercel.app", "https://rococo-madeleine-1bedfb.netlify.app"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Route Middleware
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/contactus", contactRoute);

// // Routes
// app.get("/", (req, res) => {
//     res.send("Home Page");
// });

// // Error Middleware
// app.use(errorHandler);

// // Connect to DB and start server
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server Running on Port ${PORT}`);
//         });
//     })
//     .catch((err) => console.log(err));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Apply CORS middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://pinvent-app-frontends.vercel.app",
        "https://66952cd7d78a072d045cbffc--rococo-madeleine-1bedfb.netlify.app/"
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Log all requests
app.use((req, res, next) => {
    console.log("Received request:", req.method, req.url);
    console.log("Request headers:", req.headers);
    next();
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
