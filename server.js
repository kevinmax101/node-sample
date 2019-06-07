var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/static', express.static('public'))

var con = mysql.createConnection({
	host: "mysampledb.c7vnnx79s7c3.us-east-1.rds.amazonaws.com",
	user: "jigs",
	password: "jigsjigs",
	database: "jigsdb"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get('/', function (req, res) {
	console.log("Got a GET request for the homepage");
	// var sql = "INSERT INTO user (firstname, middlename, lastname) VALUES ('Jigs 1', 'P', 'Gasataya 2')";
	// con.query(sql, function (err, result) {
	// 	if (err) throw err;
	// 	console.log("1 record inserted");
	// });

	res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/', function (req, res) {
	console.log(req.body)
	const newUser = req.body
	console.log("Got a POST request for the homepage");
	var sql = `INSERT INTO user (firstname, middlename, lastname) VALUES ('${newUser.firstname}', '${newUser.middlename}', '${newUser.lastname}')`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		res.json(result);
	});
})

app.delete('/del_user', function (req, res) {
	var sql = `DELETE FROM user WHERE id = ${req.body.id}`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Number of records deleted: " + result.affectedRows);
		res.json(result);
	});
})

app.get('/list_user', function (req, res) {
	console.log("Got a GET request for /list_user");
	con.query("SELECT * FROM user", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.json(result);
	});
	// res.send('Page Listing');
})

app.get('/get_user', function (req, res) {
	console.log("Got a GET request for /get_user");
	con.query("SELECT * FROM user where id=" + req.query.id, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.json(result);
	});
})

app.put('/update_user', function (req, res) {
	const updateUser = req.body
	console.log("Got a POST request for the homepage");
	var sql = `Update user set firstname= '${updateUser.firstname}', middlename='${updateUser.middlename}', lastname='${updateUser.lastname}' where id=${updateUser.id}`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		res.json(result);
	});
})

var server = app.listen(8080, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})