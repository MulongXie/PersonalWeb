var express	= require("express");
var app	= express();

app.use(express.static("."));
app.use(express.static("cellular"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/cellular/cellular.html')
})

app.listen(8888, function () {
    console.log("Working on port 8888");
})