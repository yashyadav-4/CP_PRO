const express= require('express');
const router = express.Router();
const {verifyToken, optionalAuth}=require('../Middlewares/auth')


const {handleCreatePost , handleDeletePost , handleDownVote , handleUpvotes ,handleGetPosts, handleTogglePin, handleEditPost }= require('../Controllers/Post');

router.get('/' , optionalAuth, handleGetPosts);

router.post('/', verifyToken, handleCreatePost);
router.patch('/:id', verifyToken, handleEditPost);
router.delete('/:id' , verifyToken, handleDeletePost);
router.patch('/:id/upvote' , verifyToken, handleUpvotes);
router.patch('/:id/downvote' , verifyToken, handleDownVote);
router.patch('/:id/pin', verifyToken, handleTogglePin);

module.exports=router;
