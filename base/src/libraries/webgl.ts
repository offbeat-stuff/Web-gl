var glProperties = {
    fill: [0.0, 0.0, 0.0] as color
};

function fillGl(a: number, b: number = a, c: number = a) {
    glProperties.fill = [a, b, c];
}

function clearGl(a: number, b: number = a, c: number = a, d: number = 1.0) {
    gl.clearColor(a, b, c, 1.0);
    gl.clearDepth(d);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function drawTriangle(
    a: vec2,
    b: vec2,
    c: vec2,
    clr: color = glProperties.fill
) {
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

function drawArray(
    data: number[],
    attribs: [string, number][],
    type: number = gl.TRIANGLES
) {
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
    let totalSize = 0;
    attribs.forEach((x) => {
        totalSize += x[1];
    });
    let currentPos = 0;
    attribs.forEach((x) => {
        assignData(x[0], x[1], totalSize, currentPos);
        currentPos += x[1];
    });
    gl.useProgram(program);
    gl.drawArrays(type, 0, Math.floor(data.length / totalSize));
}

function assignData(
    attrib: string,
    size: number,
    totalSize: number,
    offset: number,
    normalize: boolean = false
) {
    var attribLocation = gl.getAttribLocation(program, attrib);
    gl.vertexAttribPointer(
        attribLocation, // Attribute location
        Math.floor(size), // Number of elements per attribute
        gl.FLOAT, // Type of elements
        normalize,
        Math.floor(totalSize) * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        Math.floor(offset) * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(attribLocation);
}

async function createProgram(vsUrl: string, fsUrl: string) {
    var vertexShader = await compileShader(vsUrl, true, gl.VERTEX_SHADER);
    var fragmentShader = await compileShader(fsUrl, true, gl.FRAGMENT_SHADER);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error(
            'ERROR validating program!',
            gl.getProgramInfoLog(program)
        );
        return;
    }
    return program;
}

function compileShader(
    src: string,
    isUrl: boolean = true,
    type: number
): WebGLShader | PromiseLike<WebGLShader> {
    if (isUrl) {
        return readFile(src).then((res: string) => {
            return compileShader(res, false, type);
        });
    } else {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(
                `ERROR compiling your shader! of type ${
                    type == gl.VERTEX_SHADER
                        ? 'Vertex Shader'
                        : 'Fragment Shader'
                } and ${isUrl ? `from ${src}` : `with src \n${src}`}`,
                gl.getShaderInfoLog(shader)
            );
            return;
        }
        return shader;
    }
}
