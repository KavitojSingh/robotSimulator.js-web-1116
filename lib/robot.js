'use strict';
const directions = [ 'north', 'east', 'south', 'west' ]

function Robot() {

}

/* Robot Bearing */

// Set Bearing
Robot.prototype.orient = function(currentDirection) {
  if(directions.indexOf(currentDirection) > -1){
    this.bearing = currentDirection
  } else {
    throw new Error("Invalid Robot Bearing")
  }
};

// Turning Functions
Robot.prototype.turnRight = function(){
  var directionIndex = directions.indexOf(this.bearing)
  if(directionIndex > -1){
    if (directionIndex == 3) {
      this.bearing = directions[0]
    } else {
      this.bearing = directions[directionIndex + 1]
    }
  }
}

Robot.prototype.turnLeft = function(){
  var directionIndex = directions.indexOf(this.bearing)
  if(directionIndex > -1){
    if (directionIndex == 0) {
      this.bearing = directions[3]
    } else {
      this.bearing = directions[directionIndex - 1]
    }
  }
}


/* Positioning */

// Set position
Robot.prototype.at = function(x, y){
  this.coordinates = [x, y]
}

// Advance Robot
Robot.prototype.advance = function () {
  var x = this.coordinates[0]
  var y = this.coordinates[1]
  switch (this.bearing) {
    case 'north':
      this.coordinates = [x, y + 1]
      break;
    case 'south':
      this.coordinates = [x, y - 1]
      break;
    case 'east':
      this.coordinates = [x + 1, y]
      break;
    case 'west':
      this.coordinates = [x - 1, y]
  }
};

Robot.prototype.convertLetter = function(array, letter){
  switch (letter) {
    case 'L':
      array.push('turnLeft')
      break;
    case 'R':
      array.push('turnRight')
      break;
    case 'A':
      array.push('advance')
      break;
  }
}

/* Instructions */

Robot.prototype.instructions = function(commandLetters){
  var array = []
  var self = this
  var commandLetters = commandLetters.split('')
  commandLetters.forEach(function(letter){
    self.convertLetter(array, letter)
  })
  return array
}

Robot.prototype.place = function(obj){
  this.coordinates = [obj.x, obj.y]
  this.bearing = obj.direction
}

Robot.prototype.evaluate = function(commandLetters){
  var commands = this.instructions(commandLetters)
  for (var i = 0; i < commands.length; i++) {
    this[commands[i]]()
  }
}

//
//
// var r2d2 = new Robot('r2d2')
// r2d2.orient('north')
// r2d2.at([1,1])
// var c3po = new Robot('c3po')
// c3po.orient('south')
