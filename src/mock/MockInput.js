class MockInput {
  #returnValues;

  constructor(returnValues) {
    this.#returnValues = returnValues;
  }

  async readLineAsync(message) {
    return new Promise((resolve, reject) => {
      resolve(this.#returnValues.shift());
    });
  }
}

export default MockInput;
