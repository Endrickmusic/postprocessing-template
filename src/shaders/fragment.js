export const fragmentShader = `
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    
    // Create a rainbow tint based on UV coordinates
    vec3 tint = vec3(
        0.5 + 0.5 * sin(vUv.x * 3.14159),
        0.5 + 0.5 * sin(vUv.y * 3.14159),
        0.5 + 0.5 * cos((vUv.x + vUv.y) * 3.14159)
    );
    
    // gl_FragColor = vec4(texel.rgb * tint, 1.0);
    // gl_FragColor = vec4(tint, 1.0);
    gl_FragColor = texel;
}`
