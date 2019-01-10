
var x = "Reason: error [1009]: "
var a = /(?<=([^a-zA-Z0-9]|^))error \[1009\](?=([^a-zA-Z0-9]|$))/gi;

x = x.replace(a, ' xxxxxxxx ');

console.log(x);
