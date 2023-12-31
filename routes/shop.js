const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop/shopController');
router.get('/profile',shopController.getProfile);
router.get('/products',shopController.getProducts);
router.get('/addtocart',shopController.addtocart)


module.exports=router;