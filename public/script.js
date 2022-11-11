const carCanvas    = document.getElementById("carCanvas");
carCanvas.width    = 200;

// const aiCanvas    = document.getElementById("aiCanvas");
// aiCanvas.width    = 200;

const carCTX       = carCanvas.getContext("2d");
// const aiCTX       = aiCanvas.getContext("2d");

const road      = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car       = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic   = [
    new Car(road.getLaneCenter(1), -100,30,50, "DUMMY", 2)
];

animate();

//Animate Car Movement 
function animate(){
    for(let i=0; i < traffic.length;i++){
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    carCanvas.height = window.innerHeight;
    // aiCanvas.height = window.innerHeight;

    carCTX.save();

    carCTX.translate(0, -car.y+carCanvas.height*0.5); //Add camera effect that follows the car

    road.draw(carCTX);
    for(let i=0; i< traffic.length; i++) {
        traffic[i].draw(carCTX, "blue");
    }
    car.draw(carCTX, "green");

    carCTX.restore();
    // Visualizer.drawNetwork(aiCTX, car.brain);
    requestAnimationFrame(animate);
}
