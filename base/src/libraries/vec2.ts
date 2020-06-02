class vec2 {
	x: number;
	y: number;
	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
	add(v: vec2): vec2 {
		return new vec2(this.x + v.x, this.y + v.y);
	}
	mult(a: number | vec2, b: number | vec2 = a): vec2 {
		if (a instanceof vec2) {
			return this.mult(a.x, a.y);
		}
		if (typeof b == "number") return new vec2(this.x * a, this.y * b);
		else return new vec2(this.x * a, this.y * b.y);
	}
}
