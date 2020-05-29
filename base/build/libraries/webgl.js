var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var glProperties = {
    fill: [0.0, 0.0, 0.0]
};
function fillGl(a, b, c) {
    if (b === void 0) { b = a; }
    if (c === void 0) { c = a; }
    glProperties.fill = [a, b, c];
}
function clearGl(a, b, c, d) {
    if (b === void 0) { b = a; }
    if (c === void 0) { c = a; }
    if (d === void 0) { d = 1.0; }
    gl.clearColor(a, b, c, 1.0);
    gl.clearDepth(d);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
function drawTriangle(a, b, c, clr) {
    if (clr === void 0) { clr = glProperties.fill; }
    var triangleVertices = [
        a.x,
        a.y,
        clr[0],
        clr[1],
        clr[2],
        b.x,
        b.y,
        clr[0],
        clr[1],
        clr[2],
        c.x,
        c.y,
        clr[0],
        clr[1],
        clr[2]
    ];
    drawArray(triangleVertices, [
        ['vertPos', 2],
        ['vertColor', 3]
    ]);
}
function drawArray(data, attribs, type) {
    if (type === void 0) { type = gl.TRIANGLES; }
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
    var totalSize = 0;
    attribs.forEach(function (x) {
        totalSize += x[1];
    });
    var currentPos = 0;
    attribs.forEach(function (x) {
        assignData(x[0], x[1], totalSize, currentPos);
        currentPos += x[1];
    });
    gl.useProgram(program);
    gl.drawArrays(type, 0, Math.floor(data.length / totalSize));
}
function assignData(attrib, size, totalSize, offset, normalize) {
    if (normalize === void 0) { normalize = false; }
    var attribLocation = gl.getAttribLocation(program, attrib);
    gl.vertexAttribPointer(attribLocation, // Attribute location
    Math.floor(size), // Number of elements per attribute
    gl.FLOAT, // Type of elements
    normalize, Math.floor(totalSize) * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    Math.floor(offset) * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(attribLocation);
}
function createProgram(vsUrl, fsUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var vertexShader, fragmentShader, program;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, compileShader(vsUrl, true, gl.VERTEX_SHADER)];
                case 1:
                    vertexShader = _a.sent();
                    return [4 /*yield*/, compileShader(fsUrl, true, gl.FRAGMENT_SHADER)];
                case 2:
                    fragmentShader = _a.sent();
                    program = gl.createProgram();
                    gl.attachShader(program, vertexShader);
                    gl.attachShader(program, fragmentShader);
                    gl.linkProgram(program);
                    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
                        return [2 /*return*/];
                    }
                    gl.validateProgram(program);
                    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
                        return [2 /*return*/];
                    }
                    return [2 /*return*/, program];
            }
        });
    });
}
function compileShader(src, isUrl, type) {
    if (isUrl === void 0) { isUrl = true; }
    if (isUrl) {
        return readFile(src).then(function (res) {
            return compileShader(res, false, type);
        });
    }
    else {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("ERROR compiling your shader! of type " + (type == gl.VERTEX_SHADER
                ? 'Vertex Shader'
                : 'Fragment Shader') + " and " + (isUrl ? "from " + src : "with src \n" + src), gl.getShaderInfoLog(shader));
            return;
        }
        return shader;
    }
}
