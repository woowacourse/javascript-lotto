import Lotto from "./Lotto.js";

class LottoStore {
  static purchaseLottos(amount) {
    const lottoNumbersArray = [];
    return lottoNumbersArray.map((lottoNumbers) => new Lotto(lottoNumbers));
  }
}

export default LottoStore;
