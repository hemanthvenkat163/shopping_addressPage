var express = require('express');
var app = express();
var router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//database

mongoose.connect("mongodb://localhost:27017/usersDB", { useUnifiedTopology: true, useNewUrlParser : true});

const userSchema = new mongoose.Schema({
  addresses : []
});

const User = mongoose.model("User", userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add_address', function(req, res, next) {
  res.render('add_address', { title: 'Express' });
});

router.get('/view_address', function(req, res, next) {
  User.find({}, function(err, items){

    res.render('view_address', { listItems : items });

  });
});
router.post('/add_address', function(req, res, next) {

  const name = req.body.name;
  const mobile = req.body.mobile;
  const pincode = req.body.pincode;
  const locality = req.body.locality;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const landmark = req.body.landmark;
  const alternatephone = req.body.alternatephone;
  const arr = [{
    name:name,
    mobile:mobile,
    pincode:pincode,
    locality:locality,
    address:address,
    city:city,
    state:state,
    landmark:landmark,
    alternatephone:alternatephone
  }];

  const user = new User({
    addresses : arr
  });
  user.save();
  console.log("data saved");
  res.render("success");


});




module.exports = router;
