import random from "../utils/random.js";

const getRandomLottoArray = (counts) => {
  return Array.from({ length: counts }, () =>
    random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b),
  );
};

export default getRandomLottoArray;
