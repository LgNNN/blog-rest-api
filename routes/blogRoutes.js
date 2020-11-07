const express = require('express');
const blogController = require('../controller/blogController');
const router = express.Router();

//middleware for id validation (mongoIds are 24 chars in length if id is not 24 its not needed to perform operations)
router.use('/:Id',blogController.valid_id);

//retrieve all blog posts
router.get('/', blogController.blogs_retrieve);

//retrieve a specific blog post 
router.get('/:Id', blogController.blog_retrieve );

//submit a new blog post
router.post('/', blogController.valid_fields ,blogController.blog_submit);

//update a blog post
router.patch('/:Id', blogController.valid_fields ,blogController.blog_update);

//delete a blog post
router.delete('/:Id',blogController.blog_delete)

module.exports = router;
