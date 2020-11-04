const express = require('express');
const blogController = require('../controller/blogController');
const router = express.Router();

//retrieve all blog posts
router.get('/', blogController.blogs_retrieve);

//retrieve a specific blog post 
router.get('/:Id', blogController.blog_retrieve );

//submit a new blog post
router.post('/', blogController.blog_submit);

//update a blog post
router.patch('/:Id', blogController.blog_update);

//delete a blog post
router.delete('/:Id',blogController.blog_delete)

module.exports = router;
