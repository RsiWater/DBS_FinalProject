var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})
// functions
function getDataFromCustomerID(ID)
{
    let selectSQL = 
    'SELECT P.Serial_code,T.Date,T.vehicle_type,T.VID,T.type,TR.direction,T.start,T.destination,T.seat_no,T.price,P.method,P.Status FROM PAYMENT AS P,TICKET AS T,TRAIN AS TR,CUSTOMER AS C WHERE C.ID = ? AND C.ID = T.CID AND C.ID = P.CID AND T.VID = TR.Vehicle_num;';
    
    // variable 'db' can access to our database, and we use db.all() to get all query results to variable 'row'.
    db.all(selectSQL, ID, function(err, row)
    {
        if(err) throw err;        
        result = row;
    });
    
}


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Login')
});


// POST

let result;

router.post('/', function(req, res, next)
{
    console.log('??')
    console.log(req + ' body');
    getDataFromCustomerID(req.body.customerID);
    console.log('result=' + result);
    res.json(result);
})

router.post('/check', function(req, res, next)
{
    console.log(req.body.customerID);
    res.json(result);
    // res.render('Login_check')
})

module.exports = router;