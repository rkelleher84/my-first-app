// Ryan M. Kelleher 465881 COP2801
global.Promise = require('bluebird');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var options = {
    replset: {
        ssl: true,
            ha: true
    }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://heroku_58nrxwtc:1nb6vpd85953354brn8cd2cac8@ds137760.mlab.com:37760/heroku_58nrxwtc', options);

var User = require('./models/user');

app.use(bodyParser.json());

app.post('/user', function(req, res) {
    var newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    newUser.save(function(err, user) {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            return res.status(200).json(user);
        }
    });
});

app.get('/users', function(req, res) {
   User.find({}, function(err, users) {
       if (err) {
           return res.status(500).json({error: err});
       } else {
           return res.status(200).json(users);
       }
   });
});


app.post('/multiply', function(req, res) {
    promiseMultiply(req.body.num1, req.body.num2)
        .then(function(result) {
            res.status(200).json({result: result});
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

app.get('/multiply', function(req, res) {
    promiseMultiply(req.query.num1, req.query.num2)
        .then(function(result) {
            res.status(200).json({result: result});
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

function promiseMultiply(num1, num2) {
    return new Promise(function(res, rej) {
        if (num1 > 2) {
            res(num1 * num2);
        } else {
            rej({error: "number must be greater than 2"});
        }
    });
}


var port = process.env.PORT || 9001;
app.listen(port);

