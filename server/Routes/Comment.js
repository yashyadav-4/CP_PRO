const express= require('express');
const router = express.Router();
const {verifyToken, optionalAuth}=require('../Middlewares/auth')

const {handleAddComment , handleDeleteComment , handleGetComments}= require('../Controllers/Comment');

router.get('/:postId' , optionalAuth, handleGetComments);

router.post('/:postId' , verifyToken, handleAddComment);
router.delete('/:commentId' , verifyToken, handleDeleteComment);

module.exports=router;