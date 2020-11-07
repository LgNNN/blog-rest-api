const Blog = require('../models/Blog');

//blog middlewares
const valid_fields = (req,res,next)=>{
    const fields = Object.keys(req.body);
    const allowedFields = ['title','body'];
    const allFieldsValid = fields.every(field => allowedFields.includes(field));
    if(!allFieldsValid)
        return res.status(400).json({error:'Invalid Fields'});
    next();
}

const valid_id = (req,res,next) =>{
    if(req.params.Id.length !== 24)
        return res.status(404).json({error:'Blog post does not exist'});
    next();
};


//blog controllers
const blogs_retrieve = async (req,res) =>{
    try {
        const blogs = await Blog.find().exec();
        if(blogs.length === 0){
            return res.json({message:'There are no blog posts yet!'});    
        }
        res.json(blogs); 
     } catch (error) {     
         res.status(500).json({error:'Internal Server Error'});
     }
};

const blog_retrieve = async (req,res) =>{
    try {
        const blog = await Blog.findById(req.params.Id).exec();
        if(!blog)
            return res.status(404).json({error:'Blog post does not exist'});
        res.json(blog); 
     } catch (error) {
        res.status(500).json({error:'Internal Server Error'});
     }
}; 

const blog_submit = async (req,res) =>{
    const blog = new Blog(req.body);
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);  
    } catch (error) {
        res.status(400).json({error:'Bad Request'});
    }
}; 


const blog_update = async (req,res) =>{
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.Id, req.body, { new: true }).exec();
        if(!blog)
            return res.status(404).json({error:'Blog post does not exist'});   
        res.json([blog,{message:'Blog post updated successfully'}]);
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'});
    }
}; 

const blog_delete = async (req,res) =>{
    try {
        const blog = await Blog.findByIdAndDelete(req.params.Id).exec();
        if(!blog)
            return res.status(404).json({error:'Blog post does not exist'});
        res.json([blog,{message:'Blog post deleted successfully'}]);  
     } catch (error) {
        res.status(500).json({error:'Internal Server Error'});
     }
};

module.exports = {
    valid_fields,
    valid_id,
    blogs_retrieve,
    blog_retrieve,
    blog_submit,
    blog_delete,
    blog_update
};