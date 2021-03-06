var assert = require('assert');
var path = require('path');
var moduleName = path.basename(__filename).split('.')[0];

var roverModule = require('../src/rover');

var Rover = roverModule.Rover;
var point = roverModule.point;

var shouldReturn = 'Should return: ';

describe(moduleName, function() {
    var rover;
    describe('move tests:', function() {
        describe('simple moving:', function() {
            beforeEach(function() {
                rover = new Rover();
            });
            describe('moves forward one correctly', function() {
                it(shouldReturn + '{x: 0, y: 1}', function() {
                    rover.move('F');
                    assert.deepEqual(rover.getPosition(), point(0,1));
                });
            });
            describe('moves backward one correctly', function() {
                it(shouldReturn + '{x: 0, y: -1}', function() {
                    rover.move('B');
                    assert.deepEqual(rover.getPosition(), point(0,-1));
                });
            });
            describe('One forward one back', function() {
                it(shouldReturn + '{x: 0, y: 0}', function() {
                    rover.move('FB');
                    assert.deepEqual(rover.getPosition(), point(0,0));
                });
            });
            describe('Turn right and move forward', function() {
                it(shouldReturn + '{x: 1, y: 0}', function() {
                    rover.move('RF');
                    assert.deepEqual(rover.getPosition(), point(1,0));
                });
            });
            describe('Turn left and move forward', function() {
                it(shouldReturn + '{x: -1, y: 0}', function() {
                    rover.move('LF');
                    assert.deepEqual(rover.getPosition(), point(-1,0));
                });
            });
            describe('Turn left and move backward', function() {
                it(shouldReturn + '{x: 1, y: 0}', function() {
                    rover.move('LB');
                    assert.deepEqual(rover.getPosition(), point(1,0));
                });
            });

            describe('RRRRF is same as F', function() {
                it(shouldReturn + '{x: 0, y: 1}', function() {
                    rover.move('RRRRF');
                    assert.deepEqual(rover.getPosition(), point(0,1));
                });
            });
            describe('LLLLLF is same as RF', function() {
                it(shouldReturn + '{x: -1, y: 0}', function() {
                    rover.move('LLLLLF');
                    assert.deepEqual(rover.getPosition(), point(-1,0));
                });
            });
            describe('"FFRFF" would put the rover at 2,2 facing East.', function() {
                it(shouldReturn + '{x: 2, y: 2}', function() {
                    rover.move('FFRFF');
                    assert.deepEqual(rover.getPosition(), point(2,2));
                });
            });
        });

        describe('wrapping movement', function() {
            describe('given a planet with circumference of 1, wraps around itself', function() {
                it(shouldReturn + '{x: 0, y: 0}', function() {
                    rover = new Rover({planetCircumference: 1});
                    rover.move('F');
                    assert.deepEqual(rover.getPosition(), point(0,0));
                });
            });
            describe('given a planet with circumference of 1, wraps around itself, turning right', function() {
                it(shouldReturn + '{x: 0, y: 0}', function() {
                    rover = new Rover({planetCircumference: 1});
                    rover.move('RF');
                    assert.deepEqual(rover.getPosition(), point(0,0));
                });
            });
            describe('given a planet with circumference of 1, wraps around itself, turning left', function() {
                it(shouldReturn + '{x: 0, y: 0}', function() {
                    rover = new Rover({planetCircumference: 1});
                    rover.move('LF');
                    assert.deepEqual(rover.getPosition(), point(0,0));
                });
            });
            describe('given a planet with circumference of 2, moving forward 1 does not wrap', function() {
                it(shouldReturn + '{x: 0, y: 1}', function() {
                    rover = new Rover({planetCircumference: 2});
                    rover.move('F');
                    assert.deepEqual(rover.getPosition(), point(0,1));
                });
            });
            describe('given a planet with circumference of 2, moving backward 1 does wrap', function() {
                it(shouldReturn + '{x: 0, y: 1}', function() {
                    rover = new Rover({planetCircumference: 2});
                    rover.move('B');
                    assert.deepEqual(rover.getPosition(), point(0,1));
                });
            });
        });
        describe('Obstacle Detection', function() {
            describe('an Obstacle in 0,1 stops the rover', function() {
                it(shouldReturn + '{x: 0, y: 0}', function() {
                    rover = new Rover({
                        obstacles: [point(0,1)]
                    });
                    rover.move('F');
                    assert.deepEqual(rover.getPosition(), point(0,0));
                });
            });
        });

    });
});
