class MockRandomUtil {
  #returnValues;
  #index = 0;

  constructor(returnValues = []) {
    this.#returnValues = [...returnValues];
  }

  pickUniqSixNumbers() {
    const index = Math.min(this.#index++, this.#returnValues.length - 1);
    const returnValue = this.#returnValues[index] ?? [];
    
    if (returnValue.length !== 6)
      throw new Error(ERROR_MESSAGE.NOT_FOUND_MOCK_DATA);

    return returnValue;
  }
}

export default MockRandomUtil;
