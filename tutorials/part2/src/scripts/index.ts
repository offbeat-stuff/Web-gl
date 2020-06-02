declare var gl: WebGL2RenderingContext | WebGLRenderingContext;
let cvs = document.createElement("canvas");
gl = cvs.getContext("webgl2");

if (!gl) {
	console.log("Webgl-2 not supported");
	gl = cvs.getContext("webgl");
}

if (!gl) {
	alert(
		"Sorry Both WebGL and WebGL2 are not supported and experimental-support is not good so get a better browser maybe."
	);
}

var width = (gl.canvas.width = window.innerWidth);
var height = (gl.canvas.height = window.innerHeight);
gl.viewport(0, 0, width, height);

window.onresize = (ev: UIEvent) => {
	var width = (gl.canvas.width = window.innerWidth);
	var height = (gl.canvas.height = window.innerHeight);
	gl.viewport(0, 0, width, height);
	gl.clearDepth(1.0);
	gl.clearColor(0.1, 0.1, 0.1, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

document.body.appendChild(gl.canvas as HTMLCanvasElement);
document.documentElement.addEventListener("dblclick", () => {
	openFullscreen();
});

gl.clearDepth(1.0);
gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
