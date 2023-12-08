// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum = 0, DNA = []) {
  return {
    _specimenNum: specimenNum,
    _DNA: DNA,
    get specimenNum() {
      return this._specimenNum;
    },
    get DNA() {
      return this._DNA;
    },
    set specimenNum(num = specimenNum) {
      this._specimenNum = num;
    },
    set DNA(dna = DNA) {
      this._DNA = dna;
    },
    mutate() {
      const dnaBases = ["A", "T", "C", "G"];
      const randomBaseIndex = Math.floor(Math.random() * this._DNA.length);
      const randomBase = this._DNA[randomBaseIndex];
      for (let i = 0; i < dnaBases.length; i++) {
        if (dnaBases[i] !== randomBase) {
          this._DNA[randomBaseIndex] = dnaBases[i];
          break;
        }
      }
    },
    compareDNA(pAequor) {
      let numOFIdenBases = 0;
      let DNAInCommon = 0;
      for (let i = 0; i < this._DNA.length; i++) {
        if (this._DNA[i] === pAequor.DNA[i]) {
          numOFIdenBases++;
        }
      }
      DNAInCommon = Math.round((numOFIdenBases / this._DNA.length) * 100);
      console.log(
        `specimen #${this._specimenNum} and specimen #${pAequor.specimenNum} have ${DNAInCommon}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let numOFCOrG = 0;
      let percentageSurvival = 0;
      for (let i = 0; i < this._DNA.length; i++) {
        if (this._DNA[i] === "C" || this._DNA[i] === "G") {
          numOFCOrG++;
        }
      }

      percentageSurvival = Math.round((numOFCOrG / this._DNA.length) * 100);
      if (percentageSurvival >= 60) return true;
      return false;
    },
  };
}

// const pAequorFactory1 = pAequorFactory(1, mockUpStrand());
// const pAequorFactory2 = pAequorFactory(
//   pAequorFactory1.specimenNum + 1,
//   mockUpStrand()
// );

// pAequorFactory1.compareDNA(pAequorFactory2);
// pAequorFactory2.compareDNA(pAequorFactory1);

function createSurvivalPAequors() {
  const survivalPAequors = [];
  while (survivalPAequors.length < 30) {
    const pAequor = pAequorFactory(survivalPAequors.length + 1, mockUpStrand());
    if (pAequor.willLikelySurvive()) {
      console.log(
        `pAequor: ${pAequor.specimenNum} - ${
          pAequor.DNA
        } | Survival: ${pAequor.willLikelySurvive()}`
      );
      survivalPAequors.push(pAequor);
    }
  }
  return survivalPAequors;
}
createSurvivalPAequors();
