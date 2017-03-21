// Ryan M. Kelleher 465881 COP2801
global.Promise = require('bluebird');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

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

app.listen(9001);

