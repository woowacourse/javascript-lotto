import { convertAscending } from '../utils/Utils';

class Lotto {
  #lottoNumber;

  constructor(lottoNumber) {
    this.#lottoNumber = convertAscending(lottoNumber);
  }

  get lottoNumber() {
    return this.#lottoNumber;
  }
}

export default Lotto;
