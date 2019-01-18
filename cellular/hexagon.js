function Grid(points, color, alpha, isFill) {
    this.points = points;
    this.color = color;
    this.alpha = alpha;
    this.isSelected = false;
    this.isFill = isFill;
}

function hexagonGrid(base, row, column) {
    var row_index = 0;
    for (var i = 0; i < row; i+= 0.75){
        var odd_bias_i = 0,
            odd_bias_j = 0;
        if (row_index % 2 !== 0){
            odd_bias_j = 0.5;
        }
        for (var j = 0; j < column; j++){
            var points = [];
            hexagon(base, ((j - odd_bias_j) * Math.sqrt(3)), ((i - odd_bias_i) * 2), points);
            var hex = new Grid(points, "yellow", 1.0, false);
            grids.push(hex);
        }
        row_index += 1;
    }
}

function hexagon(base, x_bias, y_bias, points){

    var p0 = {}, p1 = {}, p2 = {}, p3 = {}, p4 = {}, p5 = {};
    p0['x'] = (Math.sqrt(3) / 2 + x_bias) * base;
    p0['y'] = (0 + y_bias) * base;
    points.push(p0);
    p1['x'] = (0 + x_bias) * base;
    p1['y'] = (1 / 2 + y_bias) * base;
    points.push(p1);
    p2['x'] = (0 + x_bias) * base;
    p2['y'] = (3 / 2 + y_bias) * base;
    points.push(p2);
    p3['x'] = (Math.sqrt(3) / 2 + x_bias) * base;
    p3['y'] = (2 + y_bias) * base;
    points.push(p3);
    p4['x'] = (Math.sqrt(3) + x_bias) * base;
    p4['y'] = (3 / 2 + y_bias) * base;
    points.push(p4);
    p5['x'] = (Math.sqrt(3) + x_bias) * base;
    p5['y'] = (1 / 2 + y_bias) * base;
    points.push(p5);

    var center = {};
    center['x'] = p0.x;
    center['y'] = p0.y + base;
    points.push(center);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < 6; i++){
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();
}

function isInHex(hexagon, mouse_pos, base){
    var center = hexagon.points[6];
    var relative_y = Math.abs(mouse_pos.y - center.y),
        relative_x = Math.abs(mouse_pos.x - center.x);
    if (relative_y > base || relative_x > Math.sqrt(3) / 2 * base){
        return false;
    }
    else return (base - relative_y) > relative_x / Math.sqrt(3);
}

function select(mouse_pos){
    for (var i = 0; i < grids.length; i++){
        if (isInHex(grids[i], mouse_pos, 50)){
            document.getElementById('pos').innerText = "(" + grids[i].points[6].x + "," + grids[i].points[6].y + ")" + "(" + mouse_pos.x + "," + mouse_pos.y + ")";
            grids[i].color = 'yellow';
            grids[i].isSelected = true;
            break;
        }
    }
    return grids[i];
}