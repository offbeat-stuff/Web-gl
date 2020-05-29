#version 300 es

in highp vec2 vertPos;
in lowp vec3 vertColor;
out lowp vec3 fragColor;

float sqr(float x){
    return x*x;
}

void main(){
    float dist=sqrt(sqr(vertPos.x)+sqr(vertPos.y));
    fragColor=vec3(vertPos,vertPos.x*vertPos.x/2.0);
    gl_Position=vec4(vertPos,0.0,1.0);
}