// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

function getSum(array) {
  const farthestDigit = array[array.length - 1];
  let sum = farthestDigit;
  let doublerFlag = 2;
  for (let i = array.length - 2; i >= 0; i--) {
    //doublerFlag will help with skipping to double the value of every second digit beginning from the right most digit after the checksum or farthest digit
    if (doublerFlag % 2 === 0) {
      let doubledNumber = array[i] * 2;
      if (doubledNumber > 9) doubledNumber -= 9;
      doublerFlag--;
      sum += doubledNumber;
    } else {
      sum += array[i];
      doublerFlag = 2;
    }
  }
  return sum;
}

// Add your functions below:
function validateCred(array) {
  let sum = getSum(array);
  if (sum % 10 === 0) return true;
  return false;
}

function findInvalidCards(cards) {
  let invalidCards = [];
  cards.forEach((cardArray) => {
    if (!validateCred(cardArray)) {
      invalidCards.push(cardArray);
    }
  });

  return invalidCards;
}

function idInvalidCardCompanies(invalidCard) {
  let companies = [];
  invalidCard.forEach((card) => {
    if (card[0] === 3 && !companies.includes("Amex (American Express)"))
      companies.push("Amex (American Express)");
    else if (card[0] === 4 && !companies.includes("Visa"))
      companies.push("Visa");
    else if (card[0] === 5 && !companies.includes("Mastercard"))
      companies.push("Mastercard");
    else if (card[0] === 6 && !companies.includes("Discover"))
      companies.push("Discover");
    else console.log("Company not found.");
  });
  return companies;
}

function makeInvalidCardValid(invalidCard) {
  let cardToBeValid = invalidCard.slice(0, invalidCard.length - 1);
  const checkDigit = calculateCheckDigit(cardToBeValid);
  cardToBeValid.push(checkDigit);
  return cardToBeValid;
}

function calculateCheckDigit(cardDigits) {
  let digitsToTest = [...cardDigits];
  let sum = 0;
  //doublerFlag will help with skipping to double the value of every second digit beginning from the right most digit after removing the false checksum
  let doublerFlag = 2;
  for (let i = digitsToTest.length - 1; i >= 0; i--) {
    if (doublerFlag % 2 == 0) {
      digitsToTest[i] *= 2;
      if (digitsToTest[i] > 9) {
        digitsToTest[i] -= 9;
      }
      doublerFlag--;
    } else {
      doublerFlag = 2;
    }
    // If doubling results in a number greater than 9, subtract 9
    sum += digitsToTest[i];
  }
  // Calculate the check digit as the number needed to reach a multiple of 10
  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit;
}

function makeInvalidCardsValid(invalidCards) {
  let validCards = [];
  invalidCards.forEach((card) => {
    validCards.push(makeInvalidCardValid(card));
  });
  return validCards;
}
let invalidCards = findInvalidCards(batch);

const validCards = makeInvalidCardsValid(invalidCards);

validCards.forEach((card) => console.log(validateCred(card)));
