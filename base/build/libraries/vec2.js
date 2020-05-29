var vec2 = /** @class */ (function () {
    function vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    vec2.prototype.add = function (v) {
        return new vec2(this.x + v.x, this.y + v.y);
    };
    vec2.prototype.mult = function (a, b) {
        if (b === void 0) { b = a; }
        if (a instanceof vec2) {
            return this.mult(a.x, a.y);
        }
        if (typeof b == "number")
            return new vec2(this.x * a, this.y * b);
        else
            return new vec2(this.x * a, this.y * b.y);
    };
    return vec2;
}());
