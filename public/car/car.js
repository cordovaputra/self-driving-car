class Car {
  constructor(x, y, width, height, controlType, maxSpeed=3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.collision = false; 

    if(controlType!="DUMMY"){
        this.sensor = new Sensor(this);
    }
    this.controls = new Controls(controlType);
  }

  //Adding controls to play around with the car!
  update(roadBorders, traffic) {
    if(!this.collision) {
        this.#carMovement();
        this.polygon = this.#createPolygon();
        this.collision = this.#detectCollision(roadBorders, traffic);
    }
    if(this.sensor){
        this.sensor.update(roadBorders, traffic);
    }
  }

  //Assess Damage / Detect Collision
  #detectCollision(roadBorders, traffic){
    for(let i=0; i < roadBorders.length; i++){
        if(polysIntersect(this.polygon, roadBorders[i])) {
            return true;
        }
    }
    for(let i=0; i < traffic.length; i++){
        if(polysIntersect(this.polygon, traffic[i].polygon)) {
            return true;
        }
    }
    return false; 
  }

  //Detect the corners of the car
  #createPolygon(){
    const points = [];

    const rad=Math.hypot(this.width, this.height) / 2;
    const alpha=Math.atan2(this.width, this.height);

    points.push({
        x:this.x - Math.sin(this.angle - alpha) * rad, 
        y:this.y - Math.cos(this.angle - alpha) * rad
    });

    points.push({
        x:this.x - Math.sin(this.angle + alpha) * rad, 
        y:this.y - Math.cos(this.angle + alpha) * rad
    });

    points.push({
        x:this.x - Math.sin(Math.PI+this.angle - alpha) * rad, 
        y:this.y - Math.cos(Math.PI+this.angle - alpha) * rad
    });
    points.push({
        x:this.x - Math.sin(Math.PI+this.angle + alpha) * rad, 
        y:this.y - Math.cos(Math.PI+this.angle + alpha) * rad
    });
    return points; 
  }

  #carMovement() {
    //Forward
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    //Reverse
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    //Left & Right Controls
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      //Left
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      //Right
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    //Speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    //Rotation
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx, color) {
    if(this.collision){
        ctx.fillStyle=color;
    } else {
        ctx.fillStyle=color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for(let i=1; i < this.polygon.length; i++) {
        ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    if(this.sensor){
        this.sensor.draw(ctx);
    }
  }
}
