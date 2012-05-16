var Faye   = require('faye');
var eco = require("eco");
var fs  = require("fs");

var fayeServer = new Faye.NodeAdapter({mount: '/faye'});
var express = require("express");
var server = express.createServer();


server.configure(function() {
    return server.use(express.static(__dirname + "/public"));
  });
fayeServer.attach(server);
server.listen(3015);

var client = new Faye.Client('http://localhost:3015/faye');

var template = fs.readFileSync(__dirname + "/template.html", "utf-8");
var remoteTemplate = fs.readFileSync(__dirname + "/remote.html", "utf-8");
var slides = fs.readFileSync(__dirname + "/slides.html", "utf-8");

server.get("/", function(req, res, next) {
	res.send(eco.render(template, {slides: slides, isMaster: false}));
});
server.get("/master", function(req, res, next) {
	res.send(eco.render(template, {slides: slides, isMaster: true}));
});
server.get("/remote", function(req, res, next) {
	res.send(eco.render(remoteTemplate, {}));
});

server.get("/remote/next", function(req, res, next) {
	client.publish('/reveal/master/next', {});
	res.send("")
});
server.get("/remote/back", function(req, res, next) {
	client.publish('/reveal/master/back', {});
	res.send("")
});


console.log("Server running")