var express = require('express');
var app 	= express();

var port    = 2525;

app.use(express.static(__dirname + '/public'));

console.log("Server listening on port http://localhost:%s", port);

app.listen(process.env.PORT || port);