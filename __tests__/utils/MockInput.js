import Input from "../../src/step1/view/Input.js";

class MockInput extends Input {
  #returnValues;

  constructor(returnValues = []) {
    super();
    this.#returnValues = [...returnValues];
  }

  async readLineAsync() {
    return new Promise((resolve) => {
      resolve(this.#returnValues.shift());
    });
  }
}

export default MockInput;
