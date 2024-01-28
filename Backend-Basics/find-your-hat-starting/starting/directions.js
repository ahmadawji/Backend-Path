const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let row = 0;
let column = 0;

const up = (field) => {
  const maxBorderNorth = 0;
  pointer = field.field[row][column];
  row -= 1;
  if (row < maxBorderNorth) {
    console.log("Out of bounds!");
    process.exit(0);
  }
  pointer = field.field[row][column];
  if (pointer === hole) {
    console.log("Sorry you fell down in a hole!");
    process.exit(0);
  }
  if (pointer === hat) {
    console.log("Congrats! You find your hat :)");
    process.exit(0);
  }
  field.field[row][column] = pathCharacter;
  whereAmI();
};
const down = (field) => {
  const maxBorderSouth = field.field.length - 1;
  pointer = field.field[row][column];
  row += 1;
  if (row > maxBorderSouth) {
    console.log("Out of bounds!");
    process.exit(0);
  }
  pointer = field.field[row][column];
  if (pointer === hole) {
    console.log("Sorry you fell down in a hole!");
    process.exit(0);
  }
  if (pointer === hat) {
    console.log("Congrats! You find your hat :)");
    process.exit(0);
  }
  field.field[row][column] = pathCharacter;
  whereAmI();
};

const right = (field) => {
  const maxBorderEast = field.field[0].length - 1;
  pointer = field.field[row][column];
  column += 1;
  if (row > maxBorderEast) {
    console.log("Out of bounds!");
    process.exit(0);
  }
  pointer = field.field[row][column];
  if (pointer === hole) {
    console.log("Sorry you fell down in a hole!");
    process.exit(0);
  }
  if (pointer === hat) {
    console.log("Congrats! You find your hat :)");
    process.exit(0);
  }
  field.field[row][column] = pathCharacter;
  whereAmI();
};

const left = (field) => {
  const maxBorderWest = 0;
  pointer = field.field[row][column];
  column -= 1;
  if (row < maxBorderWest) {
    console.log("Out of bounds!");
    process.exit(0);
  }
  pointer = field.field[row][column];
  if (pointer === hole) {
    console.log("Sorry you fell down in a hole!");
    process.exit(0);
  }
  if (pointer === hat) {
    console.log("Congrats! You find your hat :)");
    process.exit(0);
  }
  field.field[row][column] = pathCharacter;
  whereAmI();
};

function whereAmI() {
  console.log(`Player now in: |${row}:${column}|`);
}

module.exports = {
  up,
  down,
  right,
  left,
};
