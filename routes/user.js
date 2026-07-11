const {Router} = require("express");

const router = Router();
const User = require("../models/user");
const user = require("../models/user");

router.get('/signIn' , (req,res)=>{
    return res.render("signin");
} );

router.get("/signup" , (req,res)=>{
    return res.render("signup");
})

router.post("/signup" , async(req ,res)=>{
    const {fullName , email  , password} =  req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})

router.post("/signin" , async(req ,res)=>{
    const { email  , password} =  req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        console.log("Token" , token);
        return res.cookie("Token" , token).redirect("/");
    } catch (error) {
        console.error(error);
        return res.render("home" , {
            error : "Incorrect Email or Password",
        });
    }  
})

router.get("/logout" , (req,res)=>{
    res.clearCookie("Token").redirect("/");
})


module.exports = router;













// MONGOOSE schema.static() - NOTES

// What is schema.static()?

// -   schema.static() is used to define Model (class) methods.
// -   These methods belong to the Model (User), NOT to individual
//     documents.
// -   Static methods are attached to the model when mongoose.model() is
//     called.

// Syntax

// userSchema.static(“methodName”, function () { // logic });

// Example

// userSchema.static(“matchPass”, function () { console.log(“Checking
// password”); });

// const User = mongoose.model(“User”, userSchema);

// Now you can call: User.matchPass();

// Where is it stored?

// -   NOT stored in MongoDB.
// -   NOT stored as a field in the schema.
// -   Exists only in the Node.js application’s memory while the server is
//     running.

// Database stores only data like: { fullName, email, password }

// It NEVER stores: matchPass()

// Analogy

// Schema Fields -> Data stored in MongoDB Static Methods -> Functions
// attached to the User model

// Remember

// schema.static() = Create a function on the Model.

// Example: userSchema.static(“login”, fn) -> User.login()
// userSchema.static(“findByEmail”, fn) -> User.findByEmail()
// userSchema.static(“matchPass”, fn) -> User.matchPass()