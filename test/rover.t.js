var assert = require('assert');
var path = require('path');
var moduleName = path.basename(__filename).split('.')[0];

var roverModule = require('../src/rover');

var Rover = roverModule.Rover;
var point = roverModule.point;

var shouldReturn = 'Should return: ';

describe(moduleName, function() {
    var rover;
    beforeEach(function() {
        rover = new Rover();
    });
    describe('move', function() {
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
    });

});
