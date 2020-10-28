var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Login');
});

router.post('/', function(req,res,next)
{
    console.log(req.body.customerID+"hello");
    res.status(200).redirect('ShoppingCart')
})

module.exports = router;