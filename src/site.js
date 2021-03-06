var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasBg = document.getElementById('canvas_bg');
var contextBg = canvasBg.getContext('2d'); 
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
            vy: vy,
            canvasBg: canvasBg
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

    document.getElementById('displayTrajectory').addEventListener('change', toggleTrajectory);
    document.getElementById('hasWalls').addEventListener('change', toggleWalls);
}
 
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var hasWalls = document.getElementById('hasWalls').checked;
    var coordinates;
    balls.forEach(function(ball) {
        coordinates = ball.element.calculateCoordinates(g, hasWalls);
        if(coordinates !== null) {
            ball.element.drawTrajectory(coordinates);
        }
        
        ball.element.draw();
    })
    
    window.requestAnimationFrame(loop);
};

function resetCanvas() {
    balls = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextBg.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleTrajectory() {
    toggleClass('canvas-container', 'showTrajectory', 'hideTrajectory');
}

function toggleWalls() {
    toggleClass('canvas', 'hideWalls', 'showWalls');

}

function toggleClass(elementId, classA, classB) {
    var canvasContainer = document.getElementById(elementId);
    var showTrajectory = canvasContainer.className.indexOf(classA);
    if(showTrajectory >= 0) {
        canvasContainer.className = canvasContainer.className.replace(classA, '');
        canvasContainer.className +=  classB;
    } else {
        canvasContainer.className = canvasContainer.className.replace(classB, '');
        canvasContainer.className +=  classA;
    }
}
