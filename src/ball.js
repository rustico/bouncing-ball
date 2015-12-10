function BouncingBall(canvas, options) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.coordinates = [];

    options = options || {};
    this.radius = options.radius || 5;
    this.x0 = options.x || 0; 
    this.x = this.x0;
    this.y = options.y || 0;
    this.vy = options.vy || 0;
    this.vx = options.vx || 1;
    this.color = options.color || getRandomColor(); 
}

BouncingBall.prototype.calculateCoordinates = function(g) {
    if(this.vx <= 0) {
        return;
    }
    
    this.coordinates.push({x: this.x, y: this.y});
    
    this.vy += g;    
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.y > this.canvas.height - this.radius){
        this.y = this.canvas.height - this.radius;
        this.vy *= -0.7; 
        this.vx -= 0.01;
    }
    if (this.x > this.canvas.width + this.radius){ 
        this.x = -this.radius; 
    }
}

BouncingBall.prototype.draw = function(displayTrajectory) {
    this.context.strokeStyle = this.color;
    if(displayTrajectory) {
        this.context.beginPath();
        var lastX = this.coordinates[0];
        this.coordinates.forEach(function(coordinate) {
            if (lastX > coordinate.x) {
                this.context.moveTo(0, coordinate.y);
            } 

            this.context.lineTo(coordinate.x, coordinate.y)
            lastX = coordinate.x;
        });
        
        this.context.stroke();
    }
    
    this.context.fillStyle = this.color;    
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    this.context.closePath();
    this.context.fill();
};
