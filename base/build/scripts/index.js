canvas = document.createElement('canvas');
gl = document.createElement('canvas').getContext('webgl2');
ctx = canvas.getContext('2d');
if (!gl) {
    console.log('Webgl-2 not supported');
    gl = canvas.getContext('webgl');
}
if (!gl) {
    alert('Sorry Both WebGL and WebGL2 are not supported and experimental-support is not good so get a better browser maybe.');
}
var width = (canvas.width = gl.canvas.width = window.innerWidth);
var height = (canvas.height = gl.canvas.height = window.innerHeight);
gl.viewport(0, 0, width, height);
gl.enable(gl.DEPTH_TEST);
window.onresize = function (ev) {
    var width = (canvas.width = gl.canvas.width = window.innerWidth);
    var height = (canvas.height = gl.canvas.height = window.innerHeight);
    gl.viewport(0, 0, width, height);
    draw();
};
document.body.appendChild(gl.canvas);
document.body.appendChild(canvas);
var program;
createProgram('shaders/base.vs.glsl', 'shaders/base.fs.glsl').then(function (prog) {
    program = prog;
    draw();
});
