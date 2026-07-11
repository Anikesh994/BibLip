const {Router } = require("express")
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blogs");
const Comment = require("../models/comments");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname , "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({storage : storage});


router.get("/add-new" , (req,res)=>{
    return res.render("addBlog" , {
        user  : req.user,
    });
});


router.post("/" , upload.single('coverImage') ,async (req,res)=>{
    const {title , body} = req.body;

    const blog = await Blog.create({
        body,
        title,
        createdBy :req.user._id,
        coverImageUrl : `/uploads/${req.file.filename}`,
    });
    
    return res.redirect(`/blog/${blog._id}`);
});


router.get("/:id" , async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const findComments = await Comment.find({blogId : req.params.id}).populate('CreatedBy');
  res.render("blog" ,{
    user : req.user,
    blog,
    comments : findComments,
  });
});

router.post("/comments/:blogId" ,async (req, res)=>{
  const newComment = await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    CreatedBy : req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});


module.exports = router;
