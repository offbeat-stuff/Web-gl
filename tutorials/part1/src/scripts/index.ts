declare var canvas: HTMLCanvasElement;
canvas = document.createElement('canvas');
declare var gl: WebGL2RenderingContext | WebGLRenderingContext;
gl = document.createElement('canvas').getContext('webgl2');
declare var ctx: CanvasRenderingContext2D;
ctx = canvas.getContext('2d');

if (!gl) {
    console.log('Webgl-2 not supported');
    gl = canvas.getContext('webgl');
}

if (!gl) {
    alert(
        'Sorry Both WebGL and WebGL2 are not supported and experimental-support is not good so get a better browser maybe.'
    );
}

var width = (canvas.width = gl.canvas.width = window.innerWidth);
var height = (canvas.height = gl.canvas.height = window.innerHeight);
gl.viewport(0, 0, width, height);

window.onresize = (ev: UIEvent) => {
    var width = (canvas.width = gl.canvas.width = window.innerWidth);
    var height = (canvas.height = gl.canvas.height = window.innerHeight);
    gl.viewport(0, 0, width, height);
};

document.body.appendChild(gl.canvas as HTMLCanvasElement);

gl.clearDepth(1.0);
gl.clearColor(0.1,0.1,0.1,1.0);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
