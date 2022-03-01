import { Lotto } from './Lotto.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers;
    this.bonusNumber;
    this.winningStatus = new Array(5).fill(0);
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

  // 3, 4, 5, 5+보너스, 6개수를 배열로 반환
  compareLottos() {
    this.lottoWallet.forEach((lotto, idx) => {
      let count = 0;
      let bonus = 0;
      lotto.numbers.forEach((number, idx) => {
        this.winningNumbers.has(number) ? count++ : undefined;
        this.bonusNumber === number ? bonus++ : undefined;
      });
      this.getLottoStatus(count, bonus);
    });
  }

  getLottoStatus(count, bonus) {
    if (count === 3) {
      this.winningStatus[0]++;
    }
    if (count === 4) {
      this.winningStatus[1]++;
    }
    if (count === 5 && bonus === 0) {
      this.winningStatus[2]++;
    }
    if (count === 5 && bonus === 1) {
      this.winningStatus[3]++;
    }
    if (count === 6) {
      this.winningStatus[4]++;
    }
  }
  // 수익률 계산
}
