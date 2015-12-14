var Ball = require('../src/ball')

exports.setUp = function (callback) {
    this.canvas = {
        width: 500,
        height: 500,
        getContext: function() {}
    };

    this.g = 0.1;

    // So it doesn't call getRandomColor
    var options = {
        color: 'blue',   
    }
    
    this.ball = new Ball(this.canvas, options);
    
    callback();
};

exports.testBallPassingFloor = function(test){
    // Test if the ball goes beyond the floor we should place it above it
    this.ball.y = this.canvas.height + 10;
    var coordinates = this.ball.calculateCoordinates(this.g, false);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.y < this.canvas.height);
    test.done();
};

exports.testBallPassingCeilingWithoutWalls = function(test){
    // Test if we don't have a ceiling then ball can go over the canvas ceiling limit
    this.ball.y = -5;
    var coordinates = this.ball.calculateCoordinates(this.g, false);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.y < 0);
    test.done();
};

exports.testBallPassingCeilingWithWalls = function(test){
    // Test if we have walls activated then the ball cannot go beyond the canvas ceiling
    this.ball.y = -5;
    var coordinates = this.ball.calculateCoordinates(this.g, true);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.y > 0);
    test.done();
};

exports.testBallPassingLeftBorderWithWalls = function(test){
    // Test if we have walls activated then the ball cannot go beyond the left border
    this.ball.x = -5
    this.ball.left = true;
    var coordinates = this.ball.calculateCoordinates(this.g, true);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.x > 0);
    test.done();
};

exports.testBallPassingLeftBorderWithoutWalls = function(test){
    // Test if the ball can go beyond the left border without walls
    this.ball.x = -5
    this.ball.left = true;
    var coordinates = this.ball.calculateCoordinates(this.g, false);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.x === this.canvas.width);
    test.done();
};

exports.testBallPassingRightBorderWithWalls = function(test){
    // Test if we have walls activated then the ball cannot go beyond the right border
    this.ball.x = this.canvas.width + 10;
    var coordinates = this.ball.calculateCoordinates(this.g, true);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.x === this.canvas.width - this.ball.radius);
    test.done();
};

exports.testBallPassingRightBorderWithoutWalls = function(test){
    // Test if the ball can go beyond the right border without walls
    this.ball.x = this.canvas.width + 10;
    var coordinates = this.ball.calculateCoordinates(this.g, false);
    var toCoordinates = coordinates[1];
    test.ok(toCoordinates.x === 0);
    test.done();
};


