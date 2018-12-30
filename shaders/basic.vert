attribute vec3 position; // set in Mesh constructor
attribute vec3 normal; // set in Mesh constructor
attribute vec2 uv; // set in Mesh constructor

uniform mat4 model; // set in Mesh constructor
uniform mat4 view; // inverse of Camera position which is set in Camera constructor
uniform mat4 projection; // set in Camera constructor

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    mat4 modelView = view * model;
    vec4 viewPos = modelView * vec4(position, 1.0);
    vPos = viewPos.xyz;
    vUv = uv;
    vNormal = (modelView * vec4(normal, 0.)).xyz;
    gl_Position = projection * viewPos;
}
