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

    this.canvasBg = options.canvasBg || canvas
    this.contextBg = this.canvasBg.getContext('2d');
}

BouncingBall.prototype.calculateCoordinates = function(g, walls) {
    var self = this;
    if(self.vx <= 0) {
        return null;
    }
    
    var fromCoordinates = {x: self.x, y: self.y}
    self.coordinates.push(fromCoordinates);
    
    self.vy += g;    
    if (self.y > self.canvas.height - self.radius){
        self.y = self.canvas.height - self.radius;
        self.vy *= -0.7; 
        self.vx -= 0.01;
    } else if(self.y <= 0 && walls) {
        self.y = self.radius;
        self.vy *= -0.8; 
    } else {
        self.y += self.vy;
    }

    if(self.left) {
        if (self.x < 0 && self.left){ 
            self.x = self.canvas.width;
            if(!!walls) {
                self.x = self.radius;
                self.left = false;
            }
        } else {
            self.x -= self.vx;
        }
    } else {
        if (self.x > self.canvas.width){ 
            self.x = 0;
            if(!!walls) {
                self.left = true;
                self.x = self.canvas.width - self.radius;
            }
        } else {
            self.x += self.vx;
        }
        
    }
    
    var toCoordinates = {x: self.x, y:self.y}
    return [fromCoordinates, toCoordinates];
};

BouncingBall.prototype.draw = function() {
    var self = this;
    self.context.strokeStyle = self.color;
    self.context.fillStyle = self.color;    
    self.context.beginPath();
    self.context.arc(self.x, self.y, self.radius, 0, 2*Math.PI, true);
    self.context.closePath();
    self.context.fill();
};

BouncingBall.prototype.drawTrajectory = function(coordinates) {
    var self = this,
        fromX = coordinates[0].x,
        fromY = coordinates[0].y,
        toX = coordinates[1].x,
        toY = coordinates[1].y

    if (fromX < toX && self.left) {
        toX = 0;
    } else if(toX < fromX && !self.left) {
        toX = canvas.width;
    }

    self.contextBg.strokeStyle = self.color;
    self.contextBg.beginPath();
    self.contextBg.moveTo(fromX, fromY);
    self.contextBg.lineTo(toX, toY);
    self.contextBg.stroke();
    self.contextBg.closePath();
};

if(typeof exports !== 'undefined'){
    module.exports = BouncingBall;
}
