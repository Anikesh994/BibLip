require("dotenv").config();
const express =  require("express");


const path = require("path");
const mongoose  = require ("mongoose");
const cookieParser = require('cookie-parser')
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { checkForAuth } = require("./middlewares/authentication");

const Blog =require("./models/blogs");

const app  = express();


mongoose.connect(process.env.MONGO_URL)
.then((e)=> console.log("Mongo db connected"))
.catch((e)=> console.log(e));


app.set("view engine" ,"ejs");
app.set("views" , path.resolve("./views"));
app.use(express.urlencoded({extended : false}));

app.use(cookieParser());
app.use(checkForAuth("Token"));
app.use(express.static(path.resolve("./public")));





const PORT = process.env.PORT || 3030;


app.get("/" ,async (req , res)=>{
    //console.log("request received");
    const allBlogs = await (await Blog.find({}));
    res.render("home" ,{
        user : req.user,
        blogs : allBlogs,
    });
});

app.use("/user",userRoutes);
app.use("/blog",blogRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
});