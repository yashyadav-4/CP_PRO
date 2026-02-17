const express= require('express');
const { handleFetchAllTemplate, handleTemplateAdd, handleTemplateDelete, handleTemplateUpdate }= require('../Controllers/CodeTemplate')

const router= express.Router();

router.get('/' , handleFetchAllTemplate);
router.post('/' , handleTemplateAdd);
router.delete('/:id' , handleTemplateDelete);
router.patch('/:id' , handleTemplateUpdate);

module.exports=router;