
var i = 0;
function f() {
    console.log(i);
    i++;
    if (i < 10){
        setTimeout(f, 500);
    }

}

f();