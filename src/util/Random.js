import Validators from "../Validators";

const Random = {
  generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      randomNumbers.push(Math.floor(Math.random() * 45) + 1);
    }
    return randomNumbers;
  },

  getCorrectRandomNumbers() {
    while (true) {
      const randomNumbers = Random.generateRandomNumbers();
      if (Validators.isDuplicatedNumbers(randomNumbers)) {
        return randomNumbers;
      }
    }
  },
};

export default Random;
