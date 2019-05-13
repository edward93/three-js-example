class Engine {
  constructor() {
    this.objects = [];
    this.gravityAcc = 9.81;
    this.airDensity = 1.2;
    this.cmPerPixel = 100;
    this.coefficientOfDrag = 0.57;
  }

  step = deltaTime => {
    // NOTE: doesn't work
    // run one step of the physics engine simulation
    // in this case it will apply gravity on all objects in this.objects

    for (let i = 0; i < this.objects.length; i++) {
      const currentObj = this.objects[i];
      currentObj.physics.force.y = -currentObj.physics.mass * this.gravityAcc;
      currentObj.physics.force.y +=
        0.5 * this.airDensity * this.coefficientOfDrag * currentObj.physics.velocity.y * currentObj.physics.velocity.y;
      const dy = currentObj.physics.velocity.y * deltaTime + (0.5 * currentObj.physics.acceleration.y * deltaTime * deltaTime);

      currentObj.position.y += dy * this.cmPerPixel;
      const new_ay = currentObj.physics.force.y / currentObj.physics.mass;
      const avg_ay = 0.5 * (new_ay + currentObj.physics.acceleration.y);
      currentObj.physics.velocity.y = avg_ay * deltaTime;
      // currentObj.physics.acceleration.y = new_ay;
      // currentObj.this.objects[i].y -=
      //   this.gravityConstant * deltaTime + 0.5 * this.gravityConstant * deltaTime * deltaTime;
    }
  };

  addPhysicsObk = obj => {
    this.objects.push({
      ...obj,
      physics: {
        force: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        averageVelocity: { x: 0, y: 0, z: 0 },
        acceleration: { x: 0, y: 0, z: 0 },
        mass: 0.1, // kg
        coefficientOfDrag: 0.47
      }
    });
  };
}

export default Engine;
