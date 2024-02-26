import random from "../utils/random.js";
import { LOTTO_SETTING } from "../constants/lottoConstants.js";

const getRandomLottoArray = (counts) => {
  return Array.from({ length: counts }, () =>
    random
      .pickUniqueNumbersInRange(LOTTO_SETTING.MIN_NUMBER, LOTTO_SETTING.MAX_NUMBER, LOTTO_SETTING.LENGTH)
      .sort((a, b) => a - b),
  );
};

export default getRandomLottoArray;
