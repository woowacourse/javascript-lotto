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

  play() {
    this.readMoney();
  }

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
      `\n> 다시 시작하시겠습니까? (${MAGIC_LITERAL.retry}/${MAGIC_LITERAL.quit})`,
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
        .split(MAGIC_LITERAL.comma)
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
      const ranks = this.calculateRanks();
      const benefit = new Benefit();
      benefit.calculateRate(this.#money.getAmount(), ranks);
      this.showResult(benefit, ranks);
      this.readRetryOption();
    } catch (error) {
      console.log(error.message);
      this.readBonusNumber();
    }
  };

  #afterReadRetryOption = (input) => {
    try {
      this.#checkRetryOption(input);
    } catch (error) {
      console.log(error.message);
      this.readRetryOption();
    }
  };

  #checkRetryOption(input) {
    if (input === MAGIC_LITERAL.retry) return this.retry();
    if (input === MAGIC_LITERAL.quit) return this.quit();
    throw new Error(ERROR_MESSAGE.retryOption);
  }

  generateLottos(amount) {
    const lottoCount = amount / MAGIC_NUMBER.moneyUnit;

    this.#lottos = Array.from({ length: lottoCount }).map(() =>
      this.makeLottoNumbers()
    );
  }

  makeLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < MAGIC_NUMBER.lottoNumberCount) {
      const randomNumber = pickRandomNumberInRange(
        MAGIC_NUMBER.lottoStart,
        MAGIC_NUMBER.lottoEnd
      );
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }

    return lottoNumbers.sort((first, second) => first - second);
  }

  calculateRanks() {
    const winningNumbers = this.#winning.getWinningNumbers();
    const ranks = [0, 0, 0, 0, 0];

    this.#lottos.forEach((lotto) => {
      const matchedCount = lotto.filter((number) =>
        winningNumbers.includes(number)
      ).length;

      const rank = this.getRank(matchedCount, this.isBonus(lotto));
      if (rank !== MAGIC_NUMBER.losing) {
        ranks[rank] += 1;
      }
    });
    return ranks;
  }

  getRank(matchedCount, isBonus) {
    const rank = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );
    if (rank === -1) return MAGIC_NUMBER.losing;

    return rank;
  }

  isBonus(lotto) {
    return lotto.includes(this.#winning.getBonusNumber());
  }

  showLottos() {
    this.#lottos.forEach((lotto) => {
      outputView.printLotto(lotto);
    });
  }

  showResult(benefit, ranks) {
    outputView.printResultTitle();
    outputView.printResult(ranks);
    outputView.printBenefit(benefit.getRate());
  }

  retry() {
    const lottoMachine = new LottoMachine();
    lottoMachine.play();
  }

  quit() {
    Console.quit();
  }
}

module.exports = LottoMachine;
