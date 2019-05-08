import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./app.scss";

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
    this.renderer.render(this.scene, this.camera);
  };

  initThree = () => {
    window.THREE = THREE;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Change camera position
    this.camera.position.z = 3;

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

  addLight = () => {
    const light = new THREE.AmbientLight(0x404040);
    const dLight = new THREE.DirectionalLight(0xffffff, 5);
    this.scene.add(light);
    this.scene.add(dLight);
  };

  componentDidMount() {
    this.initThree();
    window.addEventListener("keypress", this.keyPress, false);

    this.addLight();

    this.load3dObject();
  }

  keyPress = event => {
    switch (event.key) {
      case "a":
        this.moveLeft(0.4, this.skull);
        break;
      case "d":
        this.moveRight(0.4, this.skull);
        break;
      default:
        break;
    }
  };

  moveRight = (speed = 0.3, obj) => {
    obj.position.x += speed;
  };

  moveLeft = (speed = 0.3, obj) => {
    obj.position.x -= speed;
  };

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
