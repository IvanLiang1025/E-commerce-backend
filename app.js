
const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const paymentRouter = require("./routes/payment");
const orderRouter = require("./routes/order");

const port = process.env.PORT || 8000;

//connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true
    }, 
    (err) => {
        if(err){
            console.log(err);
            return;
        }
           
    console.log("connect to database successfully");
})

// middleware
// morgan for log
app.use(morgan("dev"));
// body-parser for parsing 
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", paymentRouter);
app.use("/api", orderRouter);


app.listen(port, ()=> {
    console.log(`listening port: ${port}`);
})