class Shape{
  constructor(){
      this.color=''
  }
  setColor(colorsArray){
      this.color=(colorsArray);
  }
}
// returns Shape chosen by user
class Circle extends Shape{
  constructor(){
      super()
  }
  
  render(){
    return `<circle cx="150" cy="100" r="75" fill="${this.color}" />`;
  }
}
class Square extends Shape {
  constructor(){
      super()
  }

  render(){
      return `<rect x="75" y="25" width="150" height="150" fill="${this.color}"/>`;
  }
}

class Triangle extends Shape{
  constructor(){
      super()
  }

  render(){
      return `<polygon points="0,35 150,200 300,35" fill="${this.color}" />`;
  }
};

module.exports = {Circle, Square, Triangle}