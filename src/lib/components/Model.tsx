import { extend } from "@react-three/fiber";
import {
  RenderCubeTexture,
  shaderMaterial,
  type RenderCubeTextureApi,
} from "@react-three/drei";
import { useRef } from "react";
("");
const vertexShader = `
varying vec3 vWorldPosition;

void main () {
  vec4 wp = modelMatrix * vec4(position, 1.);
  vWorldPosition = wp.rgb;
  gl_Position = projectionMatrix * viewMatrix * wp;
}

`;
const fragmentShader = `
varying vec3 vWorldPosition;
uniform samplerCube envMap;

void main() {
  vec3 color = textureCube(envMap, normalize(vWorldPosition)).rgb;
  gl_FragColor = vec4(color, 1.);
}
`;

const ProjectEnvMaterial = shaderMaterial(
  {
    envMap: null,
  },
  vertexShader,
  fragmentShader
);

extend({ ProjectEnvMaterial });

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      projectEnvMaterial: any;
    }
  }
}

const CUBES: Record<
  "position" | "rotation" | "scale",
  [number, number, number]
>[] = [
  {
    position: [-10.906, 2.009, 1.846],
    rotation: [0, -0.195, 0],
    scale: [2.328, 7.905, 4.651],
  },
  {
    position: [-5.607, -0.754, -0.758],
    rotation: [0, 0.994, 0],
    scale: [1.97, 1.534, 3.955],
  },
  {
    position: [6.167, 0.857, 7.803],
    rotation: [0, 0.561, 0],
    scale: [3.927, 6.285, 3.687],
  },

  {
    position: [-2.017, 0.018, 6.124],
    rotation: [0, 0.333, 0],
    scale: [2.002, 4.566, 2.064],
  },
  {
    position: [2.291, -0.756, -2.621],
    rotation: [0, -0.286, 0],
    scale: [1.546, 1.552, 1.496],
  },
  {
    position: [-2.193, -0.369, -5.547],
    rotation: [0, 0.516, 0],
    scale: [3.875, 3.487, 2.986],
  },
];
export function Model() {
  const api = useRef<RenderCubeTextureApi>(null!);

  return (
    <>
      <mesh ref={api}>
        <sphereGeometry />
        <projectEnvMaterial>
          <RenderCubeTexture attach={"envMap"} flip frames={100}>
            <fogExp2 args={[0xffaaff, 0.1]} />
            <color attach={"background"} args={[0xffaaff]} />
            <ambientLight intensity={1} color={0xffaaff} />
            <pointLight
              position={[0.418, 16.199, 0.3]}
              args={[0xffffff, 900, 28, 2]}
            />
            <group>
              {CUBES.map((v, idx) => (
                <mesh key={idx} {...v}>
                  <boxGeometry />
                  <meshStandardMaterial />
                </mesh>
              ))}
            </group>

            <group>
              {/* y */}
              <mesh scale={[1.0, 0.1, 1.0]} position={[0, 20, 0]}>
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={100}
                  color={0x000000}
                />
              </mesh>
              {/* -x right */}
              <mesh
                scale={[0.1, 2.428, 2.739]}
                position={[-16.116, 14.37, 8.208]}
              >
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={50}
                  color={0x000000}
                />
              </mesh>

              {/* -x left */}
              <mesh
                scale={[0.1, 2.428, 2.739]}
                position={[-16.116, 14.37, -8.208]}
              >
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={50}
                  color={0x000000}
                />
              </mesh>
              {/* +x */}
              <mesh
                scale={[0.15, 4.265, 6.331]}
                position={[14.904, 12.198, -1.832]}
              >
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={17}
                  color={0x000000}
                />
              </mesh>
              {/* +z */}
              <mesh
                scale={[4.38, 5.441, 0.088]}
                position={[-0.462, 8.89, 14.52]}
              >
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={48}
                  color={0x000000}
                />
              </mesh>
              {/* -z */}
              <mesh
                scale={[4.38, 5.441, 0.088]}
                position={[-0.462, 8.89, -14.52]}
              >
                <boxGeometry />
                <meshLambertMaterial
                  emissive={0xffffff}
                  emissiveIntensity={100}
                  color={0x000000}
                />
              </mesh>
            </group>
          </RenderCubeTexture>
        </projectEnvMaterial>
      </mesh>
    </>
  );
}
