import Validations from "../Validations"

const Random = {
  getnerateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      randomNumbers.push(Math.floor(Math.random() * 45) + 1);
    }
    return randomNumbers;
  },

  getCorrectRandomNumbers() {
    while (true) {
      const randomNumbers = Random.getnerateRandomNumbers();
      if (Validations.isDuplicatedNumbers(randomNumbers)) {
        return randomNumbers;
      }
    }
  }
};

export default Random