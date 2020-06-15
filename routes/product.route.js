var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require('../controller/product.controller');

var authMiddleware = require('../middlewares/auth.middleware')

router.get('/', controller.index )
// router.get('/search', controller.search )

module.exports = router;

