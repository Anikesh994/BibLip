const JWT = require("jsonwebtoken");

const secretKey = "$wbfuw^*#njv";


function createToken(user){
    const payload = {
        _id : user.id,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role,

    }
    const token = JWT.sign(payload , secretKey);
    return token;

} 


function validateToken(token){
    const payload = JWT.verify(token , secretKey);
    return payload;
}

module.exports = {
    createToken,
    validateToken,
};