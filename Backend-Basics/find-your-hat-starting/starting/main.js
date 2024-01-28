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

  print() {
    this._field.forEach((space) => {
      console.log(space.join(""));
    });
  }
}

const field = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

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
