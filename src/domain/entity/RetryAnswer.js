import ERROR from '../../constant/Error';

class RetryAnswer {
  #isRetry;

  constructor(answer) {
    this.#validate(answer);
    this.#parse(answer);
  }

  get() {
    return this.#isRetry;
  }

  #validate(answer) {
    if (!['y', 'Y', 'n', 'N'].includes(answer)) {
      throw new Error(ERROR.retryYN);
    }
  }

  #parse(answer) {
    this.#isRetry = ['y', 'Y'].includes(answer);
  }
}

export default RetryAnswer;
