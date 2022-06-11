'use strict';

// const person = {
//   name: 'Hooi',
//   draw() {
//     console.log('draw');
//   },
// };
// console.log(Object.getOwnPropertyDescriptor(person, 'name'));

// const Circle = function (radius) {
//   this.radius = radius;
//   this.shape = function () {
//     console.log('shape');
//   };
// };

// Circle.prototype.draw = function () {
//   console.log('Circle radius: ', this.radius);
// };

// const c = new Circle(10);

// class Circle1 {
//   draw() {
//     console.log(this);
//   }
// }

// const c1 = new Circle1();
// const draw = c1.draw;
// draw();

class Shape {
  #color = 0;
  constructor(color) {
    this.#color = color;
  }

  static draw() {
    console.log('static draw');
  }

  draw() {
    console.log('draw');
  }
}

class Circle extends Shape {
  #radius = 0;
  constructor(radius, color) {
    super(color);
    this.#radius = radius;
  }

  static draw() {
    super.draw();
    console.log('static circle draw');
  }

  #draw() {
    super.draw();
    console.log('draw circle');
  }

  get radius() {
    return this.#radius;
  }
}

const c = new Circle(10, 'red');
console.log(c.radius);
// c.draw();
// Circle.draw();
