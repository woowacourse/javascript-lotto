import { LOTTO_RANK, LOTTO_RANK_STANDARDS } from "../constants/lotto.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validateIsIntanceofLotto(lotto);
    this.#validateIsInstanceofLottoNumber(bonusNumber);

    this.#validateUniqueBonusNumber(lotto, bonusNumber);

    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  rankLottos(lottos) {
    return lottos.map((lotto) => this.#rank(lotto));
  }

  #validateIsIntanceofLotto(lotto) {
    if (!(lotto instanceof Lotto)) {
      throw new Error("[ERROR] 로또 인스턴스만 입력 가능합니다.");
    }
  }

  #validateIsInstanceofLottoNumber(bonusNumber) {
    if (!(bonusNumber instanceof LottoNumber)) {
      throw new Error("[ERROR] 보너스 번호는 로또 번호 타입이어야 합니다.");
    }
  }

  #validateUniqueBonusNumber(lotto, bonusNumber) {
    if (lotto.has(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }

  #rank(lotto) {
    const matchCount = lotto.compare(this.#lotto);
    const hasBonusNumber = lotto.has(this.#bonusNumber);

    return this.#findRank(matchCount, hasBonusNumber);
  }

  #findRank(matchCount, hasBonusNumber) {
    const rankStandard = LOTTO_RANK_STANDARDS.find(
      (standard) =>
        standard.matchCount === matchCount &&
        standard.hasBonusNumber === hasBonusNumber
    );

    return rankStandard?.rank || LOTTO_RANK.none;
  }
}

export default WinningLotto;
