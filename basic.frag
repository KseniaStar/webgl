#ifdef GL_ES
precision highp float;
#endif

uniform vec3 lightDirection; // set in Light constructor
uniform mat4 view; // inverse of Camera position which is set in Camera constructor

uniform float shine; // set in Light constructor
uniform float ambientLight; // set in Light constructor
uniform sampler2D diffuse; // png picture - loaded in Main.js

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;

void main()
{
    // Texture (png image) wrt uv-coordinates:
    vec3 color = texture2D(diffuse, vUv).rgb;
    
    // Ambient light (calculated wrt lightDirection and intensity coefficient ambientLight):
    vec3 norm_normal = normalize(vNormal);
    vec3 norm_lightDir = normalize(lightDirection);
    float lambertian = dot(norm_normal, norm_lightDir);
    float lightness = -clamp(lambertian, -1., 0.);
    lightness = ambientLight + (1. - ambientLight) * lightness;
    
    // Specular light (depends on the view position => calculated wrt view + shine coefficient):
    vec3 lightDirectionView = (view * vec4(lightDirection, 0.)).xyz; // lightDirection transformed to view space
    vec3 norm_view_normal = normalize(-lightDirectionView);
    vec3 viewDir = normalize(vec3(0.0) - vPos);
    float kDiffuse = max(0.0, dot(norm_view_normal, norm_normal));
    vec3 halfDir = normalize(viewDir + norm_normal);
    float specAngle = max(0.0, dot(norm_view_normal, halfDir));
    float kSpecular = shine * pow(specAngle, shine) / 4.0;

    
    // Altogether:
    vec3 altogether = color * (kDiffuse + kSpecular) * lightness;
    gl_FragColor = vec4(altogether, 1.0);
}
