const runningCheck = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log("Method works!");
  };
};

class Square {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  @runningCheck()
  getArea() {
    return this.width * this.width;
  }
}

const square = new Square(5);

console.log(square.getArea());
