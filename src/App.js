import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.skull = undefined;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.skull)
      this.skull.rotation.y += 0.01;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };

  init = () => {
    window.THREE = THREE;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.z = 3;
    // this.camera.position.y = 1;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.animate();
  };

  load3dObject = () => {
    const loader = new GLTFLoader();
    loader.load(
      "models/skull/scene.gltf",
      obj => {
        this.skull = obj.scene;
        this.scene.add(obj.scene);
      },
      undefined,
      error => {
        console.error(error);
      }
    );
  };

  addCubeToScene = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  };

  addLight = () => {
    const light = new THREE.AmbientLight(0x404040);
    const dLight = new THREE.DirectionalLight(0xffffff, 5);
    this.scene.add(light);
    this.scene.add(dLight);
  };

  componentDidMount() {
    this.init();

    this.addLight();

    // this.addCubeToScene();
    this.load3dObject();
  }

  render() {
    return <canvas ref={ref => (this.canvas = ref)} />;
  }
}

export default App;
