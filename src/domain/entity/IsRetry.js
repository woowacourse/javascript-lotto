import ERROR from '../../constant/Error';

class IsRetry {
  #isRetry;

  constructor(isRetry) {
    this.#validate(isRetry);
    this.#parse(isRetry);
  }

  get() {
    return this.#isRetry;
  }

  #validate(isRetry) {
    if (!['y', 'Y', 'n', 'N'].includes(isRetry)) {
      throw new Error(ERROR.retryYN);
    }
  }

  #parse(isRetry) {
    this.#isRetry = ['y', 'Y'].includes(isRetry);
  }
}

export default IsRetry;
