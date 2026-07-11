const {model , Schema} = require("mongoose");

const commentSchema = new Schema({
    content : {
        type : String,
        required : true,
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : "blog",
    },
    CreatedBy : {
        type : Schema.Types.ObjectId,
        ref : "user",
    },

}, {timestamps : true});

const comment = model("comment" , commentSchema);

module.exports = comment;