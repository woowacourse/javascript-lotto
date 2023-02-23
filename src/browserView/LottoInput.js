import { QuerySelector } from '../constants/HTML';
import { $ } from '../utils/DomUtils';

class LottoInput {
  constructor() {
    this.lottoInput = $(QuerySelector.LOTTO_INPUT_FIELD);
  }

  render() {
    this.lottoInput.classList.add('show');
  }
}

export default LottoInput;
