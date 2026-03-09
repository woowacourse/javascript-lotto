import RandomUtil from "../../src/step1/util/RandomUtil.js";
import { LOTTO } from "../../src/step1/constant/index.js";
import { ERROR_MESSAGE } from "../../src/step1/constant/message.js";

class MockRandomUtil extends RandomUtil {
  #returnValues;
  #index = 0;

  constructor(returnValues = []) {
    super();
    this.#returnValues = [...returnValues];
  }

  pickUniqNumbers() {
    const index = Math.min(this.#index++, this.#returnValues.length - 1);
    const returnValue = this.#returnValues[index] ?? [];
    
    if (returnValue.length !== LOTTO.COUNT)
      throw new Error(ERROR_MESSAGE.NOT_FOUND_MOCK_DATA);

    return returnValue;
  }
}

export default MockRandomUtil;
