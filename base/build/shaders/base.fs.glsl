#version 300 es
precision highp float;

in lowp vec3 fragColor;
out lowp vec4 outColor;

void main() {
    outColor = vec4(fragColor,1.0);
}