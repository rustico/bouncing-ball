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
    this.left = options.left || false;
}

BouncingBall.prototype.calculateCoordinates = function(g) {
    var that = this;
    if(that.vx <= 0) {
        return false;
    }
    
    that.coordinates.push({x: that.x, y: that.y});
    
    that.vy += g;    

    if(that.left) {
        that.x -= that.vx;
    } else {
        that.x += that.vx;
    }
    that.y += that.vy;
    
    if (that.y > that.canvas.height - that.radius){
        that.y = that.canvas.height - that.radius;
        that.vy *= -0.7; 
        that.vx -= 0.01;
    }
    if (that.x > that.canvas.width + that.radius && !that.left){ 
        that.x = -that.radius; 
    }

    if (that.x < 0 && that.left){ 
        that.x = that.canvas.width; 
    }

    return true;
};

BouncingBall.prototype.draw = function(displayTrajectory) {
    var that = this;
    that.context.strokeStyle = that.color;
    if(displayTrajectory) {
        that.context.beginPath();
        var lastX = that.coordinates[0];
        that.coordinates.forEach(function(coordinate) {
            if (lastX > coordinate.x && !that.left) {
                that.context.moveTo(0, coordinate.y);
            } else if(lastX < coordinate.x && that.left) {
                that.context.moveTo(that.canvas.width, coordinate.y);
            }

            that.context.lineTo(coordinate.x, coordinate.y)
            lastX = coordinate.x;
        });
        
        that.context.stroke();
    }
    
    that.context.fillStyle = that.color;    
    that.context.beginPath();
    that.context.arc(that.x, that.y, that.radius, 0, 2*Math.PI, true);
    that.context.closePath();
    that.context.fill();
};
