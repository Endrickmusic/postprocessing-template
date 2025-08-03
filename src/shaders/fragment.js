export const fragmentShader = `
uniform sampler2D tDiffuse;
uniform vec2 uTexelSize;
uniform float threshold;
varying vec2 vUv;

void main() {
    vec2 texelSize = uTexelSize;
    float kernelX[9];
    float kernelY[9];
    kernelX[0] = -1.0; kernelX[1] = 0.0; kernelX[2] = 1.0;
    kernelX[3] = -2.0; kernelX[4] = 0.0; kernelX[5] = 2.0;
    kernelX[6] = -1.0; kernelX[7] = 0.0; kernelX[8] = 1.0;
    kernelY[0] = -1.0; kernelY[1] = -2.0; kernelY[2] = -1.0;
    kernelY[3] =  0.0; kernelY[4] =  0.0; kernelY[5] =  0.0;
    kernelY[6] =  1.0; kernelY[7] =  2.0; kernelY[8] =  1.0;

    vec3 colorSample[9];
    int i = 0;
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            colorSample[i++] = texture2D(tDiffuse, vUv + vec2(x, y) * texelSize).rgb;
        }
    }
    float gx = 0.0;
    float gy = 0.0;
    for(int j = 0; j < 9; j++) {
        float gray = dot(colorSample[j], vec3(0.299, 0.587, 0.114));
        gx += kernelX[j] * gray;
        gy += kernelY[j] * gray;
    }
    float edge = length(vec2(gx, gy));
    edge = smoothstep(threshold, threshold + 0.1, edge);

    vec4 texel = texture2D(tDiffuse, vUv);
    vec3 sobelColor = vec3(edge);
    gl_FragColor = vec4(sobelColor, 1.0);
}`
