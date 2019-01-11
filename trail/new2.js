

var i = 0;

function f() {
    i += 1;
    console.log(i);
    setTimeout(f, 1000);
}

f();