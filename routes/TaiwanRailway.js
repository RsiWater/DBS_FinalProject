let bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})

router.use(bodyParser.urlencoded({extended: false}));

/* GET users listing. */
router.get('/', function(req, res, next) {
    let sqlString = 'SELECT * FROM STATION WHERE vehicle_type = "Train"';
    console.log('SELECT');
    // let result = [];
    db.all(sqlString, function(err, row)
    {
        if(err) console.log(err);

        res.render('TaiwanRailway', {content: row})
    })
});

/* POST users listing. */
router.post('/', function(req, res, next)
{   
    let CID = req.body.ID;
    let SQL_customer = 'INSERT INTO customer(ID,region,SID) VALUES(?,?,?);';
    let SQL_ticket = 'INSERT INTO ticket(VID,Vehicle_type,Date,start,destination,seat_no,price,type,CID) VALUES(?,"Train",?,?,?,?,"600",?,?);';

    db.run(SQL_customer,CID,req.body.region,generateRandomSID(),function(err)
    {
        if(err) { console.log(err); }
        else
        {
            db.run(SQL_ticket,generateRandomVID(),req.body.date,req.body.start,req.body.destination,generateRandomSeatNo() , req.body.type, req.body.ID,function(err)
            {
                if(err) console.log(err);
            })
        }
        
    });

    console.log("insert data into database.")
})

module.exports = router;

function generateRandomSID() { return Math.floor(Math.random()*999999)+100000; }
function generateRandomVID() { return Math.floor(Math.random()*9999)+1000; }
function generateRandomSeatNo() { return Math.floor(Math.random()*99)+10; }