import { Lotto } from './Lotto.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers;
    this.bonusNumber;
    // 당첨 번호
  }

  insertMoney = (moneyInput) => (this.moneyInput = moneyInput);

  buyLotto = () => {
    this.lottoWallet = [
      ...this.lottoWallet,
      ...[...new Array(Math.floor(this.moneyInput / CONDITIONS.LOTTO_PRICE))].map(
        () => new Lotto()
      ),
    ];
  };

  getWinningNumbers(winningNumbers, bonusNumber) {
    const checkLotto = new Set(Object.values(winningNumbers));
    if (checkLotto.size !== CONDITIONS.LOTTO_SIZE || checkLotto.has(bonusNumber)) {
      throw new Error('당첨 번호는 중복될 수 없습니다.');
    }
    this.winningNumbers = checkLotto;
    this.bonusNumber = bonusNumber;
  }
  // 보유한 로또들의 일치 갯수를 알 수 배열로 확인

  // 3, 4, 5, 5+보너스, 6개수를 배열로 반환

  // 수익률 계산
}
