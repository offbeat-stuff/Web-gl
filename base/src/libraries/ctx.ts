// var ctxProperties={
//     fill:[0.0,0.0,0.0] as color,
//     stroke:[0.0,0.0,0.0] as color,
// }

function fill(a: number | string, b?: number, c?: number, d?: number) {
    if (typeof a == 'number') {
        if (d == undefined) {
            if (b == undefined) {
                d = 1.0;
            } else {
                d = b;
                b = a;
                c = a;
            }
        }
        ctx.fillStyle = `rgba(${a * 255},${b * 255},${c * 255},${d * 255})`;
    } else {
        ctx.fillStyle = a;
    }
}

function stroke(a: number, b: number = a, c: number = a) {
    ctx.strokeStyle = `rgb(${a * 255},${b * 255},${c * 255})`;
}

function fillShape(path: vec2[], pos: vec2, r: number) {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(r);
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
