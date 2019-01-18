function paint(start_c_x=wid / 2, start_c_y=hgt / 2) {
    var grd = ctx.createRadialGradient(start_c_x, start_c_y, 10, wid / 2, hgt / 2, wid);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, 'gold');

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = grd;
    ctx.fillRect(1, 1, wid - 1, hgt - 1);
}

var alpha = 0.0;
function draw() {
    ctx.clearRect(0, 0, wid, hgt);
    paint(wid / 2, hgt / 2);
    for (var i = 0; i < grids.length; i++){
        if (grids[i].isSelected){
            alpha = 0.0;
            fadein(grids[i]);
            grids[i].isSelected = false;
        }
        else{
            drawGrid(grids[i], grids[i].alpha);
        }
    }
}

function drawGrid(grid, al) {
    ctx.globalAlpha = al;
    var points = grid.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var j = 1; j < 6; j++){
        ctx.lineTo(points[j].x, points[j].y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();

    if (grid.isFill){
        ctx.fillStyle = grid.color;
        ctx.fill();
    }
}


function fadein(grid){
    drawGrid(grid, alpha);
    alpha += 0.1;
    if (alpha < 1.0){
        setTimeout(fadein, 50, grid);
    }
}