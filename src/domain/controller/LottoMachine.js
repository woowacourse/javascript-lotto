const {
  MAGIC_NUMBER,
  RANK_INFORMATIONS,
  MAGIC_LITERAL,
  ERROR_MESSAGE,
} = require('../../constant');
const { pickRandomNumberInRange } = require('../../utils');
const Console = require('../../utils/Console');
const inputHandler = require('../../view/inputView');
const outputView = require('../../view/outputView');
const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');

class LottoMachine {
  #lottos;

  #money;

  #winning;

  #ranks;

  #benefit;

  readMoney() {
    inputHandler('> 구입금액을 입력해 주세요.', this.#afterReadMoney);
  }

  readWinningNumbers() {
    inputHandler(
      '\n> 당첨 번호를 입력해 주세요.',
      this.#afterReadWinningNumbers
    );
  }

  readBonusNumber() {
    inputHandler(
      '\n> 보너스 번호를 입력해 주세요.',
      this.#afterReadBonusNumber
    );
  }

  readRetryOption() {
    inputHandler(
      '\n> 다시 시작하시겠습니까? (y/n)',
      this.#afterReadRetryOption
    );
  }

  #afterReadMoney = (input) => {
    try {
      this.#money = new Money(input);
      outputView.printLottoCount(this.#money.getAmount());
      this.generateLottos(this.#money.getAmount());
      this.showLottos();
      this.readWinningNumbers();
    } catch (error) {
      console.log(error.message);
      this.readMoney();
    }
  };

  #afterReadWinningNumbers = (input) => {
    try {
      const winningNumbers = input
        .split(',')
        .map((winningNumber) => Number(winningNumber));
      this.#winning = new Winning();
      this.#winning.setWinningNumbers(winningNumbers);
      this.readBonusNumber();
    } catch (error) {
      console.log(error.message);
      this.readWinningNumbers();
    }
  };

  #afterReadBonusNumber = (input) => {
    try {
      this.#winning.setBonusNumber(Number(input));
      this.calculateRanks();
      this.#benefit = new Benefit();
      this.#benefit.calculateRate(this.#money.getAmount(), this.#ranks);
      this.showResult();
      this.readRetryOption();
    } catch (error) {
      console.log(error.message);
      this.readBonusNumber();
    }
  };

  makeLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < 6) {
      const randomNumber = pickRandomNumberInRange(1, 45);
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }

    return lottoNumbers.sort((first, second) => first - second);
  }

  showLottos() {
    this.#lottos.forEach((lotto) => {
      outputView.printLotto(lotto);
    });
  }

  showResult() {
    outputView.printResultTitle();
    outputView.printResult(this.#ranks);
    outputView.printBenefit(this.#benefit.getRate());
  }

  calculateRanks() {
    const winningNumbers = this.#winning.getWinningNumbers();
    const ranks = [0, 0, 0, 0, 0];

    this.#lottos.forEach((lotto) => {
      const matchedCount = lotto.filter((number) =>
        winningNumbers.includes(number)
      ).length;

      const rank = this.getRank(matchedCount, this.isBonus(lotto));
      if (rank < 6) {
        ranks[rank] += 1;
      }
    });
    this.#ranks = ranks;
  }

  isBonus(lotto) {
    return lotto.includes(this.#winning.getBonusNumber());
  }

  getRank(matchedCount, isBonus) {
    if (matchedCount < 3) return 6;
    const rank = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );

    return rank;
  }
}

module.exports = LottoMachine;
