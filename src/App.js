import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.controls = undefined;

    // Object in scene
    this.skull = undefined;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  initThree = () => {
    window.THREE = THREE;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#d8d8d8");
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Change camera position
    this.camera.position.z = 3;
    this.camera.position.y = 1;
    this.controls = new OrbitControls(this.camera);

    this.controls.center.set(0, 1, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    const grid = new THREE.GridHelper(5, 10, "#000", "#9b9b9b");
    grid.material.opacity = 0.4;
    grid.material.transparent = true;
    this.scene.add(grid);

    this.animate();
  };

  load3dObject = () => {
    const loader = new GLTFLoader();
    loader.load(
      "models/skull/scene.gltf",
      obj => {
        this.skull = obj.scene;
        this.skull.position.y = 1;
        this.scene.add(obj.scene);
      },
      undefined,
      error => {
        console.error(error);
      }
    );
  };

  addLight = () => {
    const light = new THREE.AmbientLight(0x404040, 3);
    const dLight = new THREE.DirectionalLight(0xffffff, 3);
    dLight.position.set(1, 1, 1);
    this.scene.add(light);
    this.scene.add(dLight);
  };

  componentDidMount() {
    this.initThree();
    this.addLight();

    this.load3dObject();
  }

  render() {
    return (
      <div className="display-container">
        <div className="layout" />
        <canvas ref={ref => (this.canvas = ref)} />
      </div>
    );
  }
}

export default App;
