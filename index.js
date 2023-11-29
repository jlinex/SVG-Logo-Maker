const inquirer = require(`inquirer`);
const fs = require('fs');
const { colorsArray } = require('./lib/colors.js');
const {Circle, Square, Triangle} = require('./lib/shapes.js');

const canvasWidth = 300;
const canvasHeight = 200;

// prompts for user input
inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color by hexadecimal or by keyword (list provided in colors.js)):',
     // checks to see if the color/hexcode is valid and updates to lowercase
      validate: (input) => {
        const isColorName = colorsArray.includes(input.toLowerCase());
        const isHexCode = /^#[0-9A-F]{6}$/i.test(input);
        return isColorName || isHexCode;
      },
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color by hexadecimal or by keyword):',
    // checks to see if the color/hexcode is valid and updates to lowercase
      validate: (input) => {
        const isColorName = colorsArray.includes(input.toLowerCase());
        const isHexCode = /^#[0-9A-F]{6}$/i.test(input);
        return isColorName || isHexCode;
      },
    },
  ])

  .then((answers) => {
    let shape;
    const text = {
      // adjusts height of shape and puts text in the center of the shape
      _attributes: {
          x: canvasWidth / 2,
          y: canvasHeight / 1.35,
          'text-anchor': 'middle',
          fill: answers.textColor,
      },
      _text: answers.text.toUpperCase(),
      // returns text and puts it inside the chosen shape
      render: function () {
          return `
            <text x="${this._attributes.x}" y="${this._attributes.y}" 
                  text-anchor="${this._attributes['text-anchor']}"
                  fill="${this._attributes.fill}" font-size="${fontSize}">
              ${this._text}
            </text>
          `;
      },
  };

    // new shape gets created
    let fontSize;
    switch (answers.shape) {
      case 'Circle':
        shape = new Circle();
        shape.setColor(answers.shapeColor);
        const circleRadius = Math.min(canvasWidth, canvasHeight) * 0.45;
        shape = new Circle(canvasWidth / 2, canvasHeight / 2, circleRadius);
        text._attributes.y = canvasHeight / 1.65;
        fontSize = 58;
        break;
      case 'Triangle':
        shape = new Triangle();
        shape.setColor(answers.shapeColor);
        const triangleHeight = Math.min(canvasWidth, canvasHeight) * 1.1;
        shape = new Triangle(canvasWidth / 2, canvasHeight / 2, triangleHeight);
        fontSize = 52;
        break;
      case 'Square':
        shape = new Square();
        shape.setColor(answers.shapeColor);
        const squareSize = Math.min(canvasWidth, canvasHeight) * 0.8;
        shape = new Square(canvasWidth / 2, canvasHeight / 2, squareSize);
        text._attributes.y = canvasHeight / 1.65;
        fontSize = 60;
        break;
    }

    const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
      ${shape.render(answers.shapeColor)}
      ${text.render()}
    </svg>`;
  

    fs.writeFileSync(`${__dirname}/logo.svg`, svgData.toString());

    console.log('Generated_logo.svg');
  })
  .catch((error) => {
    console.error(error);
  });