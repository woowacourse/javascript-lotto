import { NUMBER } from '../constants/number';
import { lottoNumberClosure } from '../utils/gameUtil';

class Lotto {
  constructor() {
    this.lottoNumbers = this.createLottoNumbers();
  }

  createLottoNumbers() {
    const getLottoNumber = lottoNumberClosure();
    return [...new Array(NUMBER.LOTTO_NUMBER_LENGTH)].map(() => getLottoNumber());
  }
}

export default Lotto;
