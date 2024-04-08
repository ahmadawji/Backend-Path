class Envelope {
  #category;
  #budget;
  #ID;

  constructor(id, category, budget) {
    if (typeof category === "string" && typeof budget === "number") {
      this.#category = category;
      this.#budget = budget;
      this.#ID = id;
    } else {
      throw new Error(
        "Make sure that category is a string and budget is a number!"
      );
    }
  }

  get category() {
    return this.#category;
  }

  get budget() {
    return this.#budget;
  }

  get ID() {
    return this.#ID;
  }

  set category(budgetCategory) {
    if (typeof budgetCategory === "string") {
      this.#category = budgetCategory;
    } else {
      throw new Error(
        `string data type required instead of ${typeof budgetCategory}`
      );
    }
  }

  set budget(budgetEnvelope) {
    if (typeof budgetEnvelope === "number") {
      this.#budget = budgetEnvelope;
    } else {
      throw new Error(
        `number data type required instead of ${typeof budgetEnvelope}`
      );
    }
  }

  envelopeObject() {
    return { id: this.#ID, category: this.#category, budget: this.#budget };
  }
}

module.exports = Envelope;
