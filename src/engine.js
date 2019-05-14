class Engine {
  constructor() {
    this.objects = [];
    this.gravityAcc = -9.81;
    this.airDensity = 1.2;
  }

  step = deltaTime => {
    // run one step of the physics engine simulation
    // in this case it will apply gravity on all objects in this.objects

    for (let i = 0; i < this.objects.length; i++) {
      const currentObj = this.objects[i];
      this.updateObjPosition(currentObj, deltaTime);
    }
  };

  // updateObjPosition = (obj, deltaTime) => {
  //   obj.physics.force.y = -obj.physics.mass * this.gravityAcc;
  //   obj.physics.force.y +=
  //     0.5 * this.airDensity * obj.physics.coefficientOfDrag * obj.physics.velocity.y * 0.01 * obj.physics.velocity.y;
  //   const dy = obj.physics.velocity.y * deltaTime + 0.5 * obj.physics.acceleration.y * deltaTime * deltaTime;

  //   obj.position.y += dy; // * this.cmPerPixel;
  //   const new_ay = obj.physics.force.y / obj.physics.mass;
  //   const avg_ay = 0.5 * (new_ay + obj.physics.acceleration.y);
  //   obj.physics.velocity.y = avg_ay * deltaTime;
  //   obj.physics.acceleration.y = new_ay;
  //   console.log(obj.physics.velocity.y);
  // };

  updateObjPosition = (obj, deltaTime, drag = true) => {
    // free fall with atmospheric drag
    // f = (W - D)
    obj.physics.force.y = this.gravityAcc * obj.physics.mass;
    if (drag) {
      obj.physics.force.y +=
        0.5 * this.airDensity * obj.physics.coefficientOfDrag * obj.physics.velocity.y * obj.physics.velocity.y;
    }

    // a = f/m
    obj.physics.acceleration.y = obj.physics.force.y / obj.physics.mass;

    // v = a * dt
    obj.physics.velocity.y += obj.physics.acceleration.y * deltaTime;
    // y = v * dt
    obj.position.y += obj.physics.velocity.y * deltaTime;
  };

  addPhysicsObj = obj => {
    this.objects.push({
      ...obj,
      physics: {
        force: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        acceleration: { x: 0, y: 0, z: 0 },
        mass: 2, // kg
        coefficientOfDrag: 0.2
      }
    });
  };
}

export default Engine;
