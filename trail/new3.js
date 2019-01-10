
var str = '{a:1, b:2}';

function str2Json(str){
    var json = eval('(' + str + ')');
    return json;
}

var j = str2Json(str);

console.log(j['a']);