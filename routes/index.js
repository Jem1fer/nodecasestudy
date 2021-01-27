var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require("crypto");

/* GET home page. */
router.get('/',
    function (req, res, next) {
        res.render('login', {title: 'Express'});
    });

router.post('/login', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var user;
    const salt = "yabc/ddef/tghi/yjkl";
    const hash = crypto.createHash('md5').update(salt, 'binary').update(password, 'utf-8').digest("hex");
    console.log("hash" + hash);
    //d1685722339e5d6ed611a5e02c6a5bd1
    //var sql='SELECT * FROM employee WHERE name = ? AND password =?';
    console.log("name" + name);
    var con = mysql.createConnection({
        host: "twocent.icu",
        user: "test",
        password: "test",
        database: "ydty"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM employee WHERE name = '" + name + "' AND password = '" + hash + "'", function (err, result) {
            if (err) throw err;
            /*console.log(result);
            console.log("result[0].id" + result[0].id);
            console.log("result[\"id\"]" + result["id"]);*/
            if (result[0].name != "") {
                //Successful
                console.log("Successful");
                //res.send("OK");
                res.redirect("/dashboard/");
            } else {
                //ERROR
                //res.send("ERROR");
                res.redirect("index");
            }

        });
    });

});

router.post('/addnew', function (req, res) {

    var name = JSON.stringify(req.body.name);
    var age = JSON.stringify(req.body.age);
    var department = JSON.stringify(req.body.department);
    console.log(name);

     var con = mysql.createConnection({
         host: "twocent.icu",
         user: "test",
         password: "test",
         database: "ydty"
     });

     con.connect(function (err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "INSERT INTO employee (name, age, department) VALUES ("+name+", "+age+", "+department+")";
         con.query(sql, function (err, result) {
             if (err) throw err;
            console.log("1 record inserted")
        });
    });
});

router.get("/emlst",
    function (req, res, next) {
        var employeeData;
        var con = mysql.createConnection({
            host: "twocent.icu",
            user: "test",
            password: "test",
            database: "ydty"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Successfully connected");
            con.query("select name, age, department from employee", function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                //console.log(JSON.parse(JSON.stringify(result)));
                //employeeData = JSON.parse(JSON.stringify(result));
                //console.log(Object.keys(data[0]));
                res.send(JSON.stringify(result));
            });
        });
    });





module.exports = router;
