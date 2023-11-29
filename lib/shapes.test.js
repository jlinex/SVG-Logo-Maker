const {Circle, Square, Triangle} =require('./shapes.js')

describe('Shapes', () => {
  test('Triangle should render correctly', () => {
    const triangle = new Triangle(0, 0, 100);
    const expected = '<polygon points="0,35 150,200 300,35" />';
    expect(triangle.render()).toBe(expected);
  });

  test('Circle should render correctly', () => {
    const circle = new Circle(0, 0, 50);
    const expected = '<circle cx="150" cy="100" r="75" />';
    expect(circle.render()).toBe(expected);
  });

  test('Square should render correctly', () => {
    const square = new Square(0, 0, 100);
    const expected = '<rect x="75" y="25" width="150" height="150" />';
    expect(square.render()).toBe(expected);
  });
});