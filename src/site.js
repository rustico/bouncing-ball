var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas_bg = document.getElementById('canvas_bg');
var context_bg = canvas_bg.getContext('2d'); 
var g = 0.1;
var balls = [];
var lastBallID = 0;

window.onload = init; 
 
function init() {
    window.requestAnimationFrame(loop);
    addEvents();
};

function addEvents() {
    canvas.addEventListener('mousedown', function(event) {
        var x,
            y,
            vx = getRandomRange(2, 5),
            vy = getRandomRange(2, 14);

        var firePosition = document.getElementById('fireAtMousePosition');
        if(firePosition.checked) {
            canvasCoordinates = canvas.getBoundingClientRect();
            x = event.clientX - canvasCoordinates.left;
            y = event.clientY - canvasCoordinates.top;
            vy *= -Math.random();
        } else {
            x = 0;
            y = canvas.height;
        }

        var options = {
            x: x,
            y: y,
            vx: vx,
            vy: vy
        };

        if(event.button !== 0) {
            options.left = true;
        }

        balls.push({id: lastBallID++, element: new BouncingBall(canvas, options)});
        
    }, false);

    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault()
        return false;
    });

    var resetCanvasButton = document.getElementById('resetCanvas');
    resetCanvasButton.addEventListener('click', resetCanvas);
}
 
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var displayTrajectory = document.getElementById('displayTrajectory').checked;
    var isBouncing;
    var removeBalls = [];
    balls.forEach(function(ball) {
        isBouncing = ball.element.calculateCoordinates(g);
        if(!isBouncing) {
            ball.element.canvas = canvas_bg;
            ball.element.context = context_bg;
            removeBalls.push(ball);
        }

        ball.element.draw(displayTrajectory);
    })

    var ballIndex;
    removeBalls.forEach(function(ball){
        ballIndex = balls.indexOf(ball);
        balls.splice(ballIndex, 1);
    })
    
    window.requestAnimationFrame(loop);
};

function resetCanvas() {
    balls = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context_bg.clearRect(0, 0, canvas.width, canvas.height);
}
