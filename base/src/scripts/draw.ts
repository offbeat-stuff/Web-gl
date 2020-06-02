function draw() {
	clearGl(0.0);
	fillGl(1.0);
	drawTriangle(new vec2(-1, -1), new vec2(1, -1), new vec2(-1, 1));
	drawTriangle(new vec2(1, 1), new vec2(-1, 1), new vec2(1, -1));
	fill("#ff01");
	ctx.fillRect(0, 0, width, height);
	//requestAnimationFrame(draw);
}
