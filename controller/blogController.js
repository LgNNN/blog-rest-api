const Blog = require('../models/Blog');

const blogs_retrieve = async (req,res) =>{
    try {
        const blogs = await Blog.find().exec();
        if(blogs.length === 0){
            res.send({message:'There are no blog posts yet!'});    
        }else{
            res.json(blogs);
        } 
     } catch (error) {     
         res.json({error:'An error occured while trying to retrieve blog posts'})
     }
};

const blog_retrieve = async (req,res) =>{
    try {
        const blog = await Blog.findById(req.params.Id).exec();
        if(blog === null){
            throw Error
        }
        res.json(blog); 
     } catch (error) {
         res.status(404);
         res.json({error:'Blog post does not exit'});
     }
}; 

const blog_submit = async (req,res) =>{

    const blog = new Blog({
        title: req.body.title,
        body: req.body.body
    });

    try {
        const newBlog = await blog.save();
        res.status(201);
        res.json(newBlog);   
    } catch (error) {
        res.json({error:'An error occured while trying to submit the post'});
    }
}; 


const blog_update = async (req,res) =>{
    
    const body ={};
    if(req.body.title){
        body.title = req.body.title;
    }
    if(req.body.body){
        body.body = req.body.body;
    }

    try {
        await Blog.updateOne({_id: req.params.Id}, {$set: body});
        const blog = await Blog.findById(req.params.Id);
            res.json([blog,{message:'Blog post updated successfully'}])
    } catch (error) {
        res.json({error:'Blog post does not exit'});
    }
}; 

const blog_delete = async (req,res) =>{
    try {
        const blog = await Blog.findById(req.params.Id).exec();
        await Blog.deleteOne({_id: req.params.Id});
        res.json([blog,{message:'Blog post deleted successfully'}]);  
     } catch (error) {
         res.status(404);
         res.json({error:'Blog post does not exit'});
     }
};

module.exports = {
    blogs_retrieve,
    blog_retrieve,
    blog_submit,
    blog_delete,
    blog_update
};