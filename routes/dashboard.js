var express = require('express');
var router = express.Router();
var mysql = require('mysql')

/* GET dashboard. */
router.get('/',
    function (req, res, next) {
        res.render('dashboard')
    });


module.exports = router;
