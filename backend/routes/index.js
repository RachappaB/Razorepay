var express = require('express');
var router = express.Router();
var payement = require('../controller/payment')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/orders', payement.orders);
router.post('/verfiy', payement.verfiy);

module.exports = router;
