import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Physics from "./engine";

import "./app.scss";
const G = 9800;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.physics = new Physics();

    this.canvas = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.controls = undefined;

    this.clock = new THREE.Clock();
    this.time = undefined;
    this.deltaTime = undefined;

    // Object in scene
    this.skull = undefined;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.time = this.clock.getElapsedTime();
    this.deltaTime = this.clock.getDelta();
    this.physics.step(this.deltaTime);
  };

  simulateGravity = () => {
    if (this.skull) {
      this.skull.position.y -= G * this.deltaTime + 0.5 * G * this.deltaTime * this.deltaTime;
    }
  };

  initThree = () => {
    window.THREE = THREE;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#d8d8d8");
    // this.scene.add(new THREE.AxesHelper(5));
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
        this.physics.addPhysicsObk(this.skull);
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
