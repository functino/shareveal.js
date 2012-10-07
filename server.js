var Faye   = require('faye');
var http = require("http");
var eco = require("eco");
var fs  = require("fs");

var fayeServer = new Faye.NodeAdapter({mount: '/faye'});
var express = require("express");
var app = express();

app.configure(function() {
    return app.use(express.static(__dirname + "/public"));
});

var client = new Faye.Client('http://localhost:3015/faye');

// var template = fs.readFileSync(__dirname + "/template.html", "utf-8");
// var remoteTemplate = fs.readFileSync(__dirname + "/remote.html", "utf-8");
// var slides = fs.readFileSync(__dirname + "/slides.html", "utf-8");

app.get("/", function(req, res, next) {
	var template = fs.readFileSync(__dirname + "/template.html", "utf-8");
	var slides = fs.readFileSync(__dirname + "/slides.html", "utf-8");
	res.send(eco.render(template, {slides: slides, isMaster: false}));
});
app.get("/master", function(req, res, next) {
	var template = fs.readFileSync(__dirname + "/template.html", "utf-8");
	var slides = fs.readFileSync(__dirname + "/slides.html", "utf-8");
	res.send(eco.render(template, {slides: slides, isMaster: true}));
});
app.get("/remote", function(req, res, next) {
	var remoteTemplate = fs.readFileSync(__dirname + "/remote.html", "utf-8");
	res.send(eco.render(remoteTemplate, {}));
});

app.get("/remote/next", function(req, res, next) {
	client.publish('/reveal/master/next', {});
	res.send("")
});
app.get("/remote/back", function(req, res, next) {
	client.publish('/reveal/master/back', {});
	res.send("")
});

var server = http.createServer(app);
fayeServer.attach(server);
server.listen(3015);

console.log("Server running")