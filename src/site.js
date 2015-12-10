var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 
var g = 0.1;
var balls = [];

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
            x = event.pageX - canvas.offsetLeft;
            y = event.pageY - canvas.offsetTop;
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

        balls.push(new BouncingBall(canvas, options));
        
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

    balls.forEach(function(ball) {
        ball.calculateCoordinates(g);
        ball.draw(displayTrajectory);
    })
    
    window.requestAnimationFrame(loop);
};

function resetCanvas() {
    balls = [];
}
