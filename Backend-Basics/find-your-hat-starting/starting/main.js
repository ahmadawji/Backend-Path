const prompt = require("prompt-sync")({ sigint: true });
const directions = require("./directions");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
  }

  get field() {
    return this._field;
  }

  set field(field) {
    this._field = field;
  }

  static generateField(height, width, percentage) {
    percentage = Math.floor(percentage);
    //-2 since one is reserved for the hat and the other for the pathCharacter
    let numberHoles = Math.round((height * width * percentage) / 100);
    let numberEmptyFields = height * width - numberHoles;

    console.log(numberHoles);
    console.log(numberEmptyFields);

    const my2DArray = [];
    const rows = height;
    const columns = width;
    if (percentage < 0 && percentage > 100) {
      console.log("please choose a range between 0 and 100.");
      return;
    }

    for (let i = 0; i < rows; i++) {
      my2DArray[i] = [];
      for (let j = 0; j < columns; j++) {
        my2DArray[i][j] = "#";
      }
    }

    //filling holes
    while (numberHoles > 0) {
      let i = Math.floor(Math.random() * rows);
      let j = Math.floor(Math.random() * columns);
      if (my2DArray[i][j] === "#") {
        my2DArray[i][j] = hole;
        numberHoles--;
      }
    }

    while (numberEmptyFields > 0) {
      let i = Math.floor(Math.random() * rows);
      let j = Math.floor(Math.random() * columns);
      if (my2DArray[i][j] === "#") {
        my2DArray[i][j] = fieldCharacter;
        numberEmptyFields--;
      }
    }

    my2DArray[0][0] = pathCharacter;
    let hatRow = 0;
    let hatColumn = 0;
    while (hatRow === 0 && hatColumn === 0) {
      hatRow = Math.floor(Math.random() * rows);
      hatColumn = Math.floor(Math.random() * columns);
      break;
    }
    my2DArray[hatRow][hatColumn] = hat;
    return my2DArray;
  }

  print() {
    console.table(this._field);
  }
}

const field = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

field.field = Field.generateField(7, 7, 50);

function startGame(field) {
  while (true) {
    field.print();
    way = prompt("Which way?").toLowerCase();

    if (way === "d") {
      directions.down(field);
    }
    if (way === "u") {
      directions.up(field);
    }
    if (way === "r") {
      directions.right(field);
    }
    if (way === "l") {
      directions.left(field);
    }
  }
}

startGame(field);
