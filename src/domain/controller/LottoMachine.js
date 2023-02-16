const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const inputHandler = require('../../view/inputView');
const outputView = require('../../view/outputView');
const { pickRandomNumberInRange, errorHandler } = require('../../utils');
const Console = require('../../utils/Console');
const {
  MAGIC_NUMBER,
  RANK_INFORMATIONS,
  MAGIC_LITERAL,
  ERROR_MESSAGE,
} = require('../../constant');

class LottoMachine {
  #lottos;

  #machineInput;

  constructor() {
    this.#machineInput = {
      money: null,
      winning: null,
    };
  }

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
      this.#machineInput.money = new Money(input);
      outputView.printLottoCount(
        this.#machineInput.money.getAmount() / MAGIC_NUMBER.moneyUnit
      );
      this.#generateLottos(this.#machineInput.money.getAmount());
      this.#showLottos();
      this.readWinningNumbers();
    } catch (error) {
      errorHandler(error, () => this.readMoney());
    }
  };

  #afterReadWinningNumbers = (input) => {
    try {
      const winningNumbers = input
        .split(MAGIC_LITERAL.comma)
        .map((winningNumber) => Number(winningNumber));
      this.#machineInput.winning = new Winning();
      this.#machineInput.winning.setWinningNumbers(winningNumbers);
      this.readBonusNumber();
    } catch (error) {
      errorHandler(error, () => this.readWinningNumbers());
    }
  };

  #afterReadBonusNumber = (input) => {
    try {
      this.#machineInput.winning.setBonusNumber(Number(input));
      const ranks = this.#getCollectedRanks();
      const benefit = new Benefit();
      benefit.calculateRate(this.#machineInput.money.getAmount(), ranks);
      this.#showResult(benefit, ranks);
      this.readRetryOption();
    } catch (error) {
      errorHandler(error, () => this.readBonusNumber());
    }
  };

  #afterReadRetryOption = (input) => {
    try {
      this.#checkRetryOption(input);
    } catch (error) {
      errorHandler(error, () => this.readRetryOption());
    }
  };

  #checkRetryOption(input) {
    if (input === MAGIC_LITERAL.retry) return this.#retry();
    if (input === MAGIC_LITERAL.quit) return this.#quit();
    throw new Error(ERROR_MESSAGE.retryOption);
  }

  #generateLottos(amount) {
    const lottoCount = amount / MAGIC_NUMBER.moneyUnit;

    this.#lottos = Array.from({ length: lottoCount }).map(() =>
      this.#getComposedLottoNumbers().sort((first, second) => first - second)
    );
  }

  #getComposedLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < MAGIC_NUMBER.lottoNumberCount) {
      const randomNumber = pickRandomNumberInRange(
        MAGIC_NUMBER.lottoStart,
        MAGIC_NUMBER.lottoEnd
      );
      lottoNumbers.add(randomNumber);
    }

    return [...lottoNumbers];
  }

  #getCollectedRanks() {
    const RANK_TEMPLATE = [0, 0, 0, 0, 0];

    const ranks = this.#lottos.reduce((accumulator, lotto) => {
      return this.#getIncreasedRanks(lotto, accumulator);
    }, RANK_TEMPLATE);

    return ranks;
  }

  #getIncreasedRanks(lotto, ranks) {
    const updatedRanks = ranks;
    const matchedCount = this.#getMatchedCount(lotto);
    const rankIndex = this.#getRankIndex(matchedCount, this.#isBonus(lotto));

    if (rankIndex !== MAGIC_NUMBER.losing) {
      updatedRanks[rankIndex] += 1;
    }

    return updatedRanks;
  }

  #getMatchedCount(lotto) {
    const winningNumbers = this.#machineInput.winning.getWinningNumbers();

    return lotto.filter((number) => winningNumbers.includes(number)).length;
  }

  #getRankIndex(matchedCount, isBonus) {
    const rankIndex = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );
    if (rankIndex === MAGIC_NUMBER.failFindIndex) return MAGIC_NUMBER.losing;

    return rankIndex;
  }

  #isBonus(lotto) {
    return lotto.includes(this.#machineInput.winning.getBonusNumber());
  }

  #showLottos() {
    this.#lottos.forEach((lotto) => {
      outputView.printLotto(lotto);
    });
  }

  #showResult(benefit, ranks) {
    outputView.printResultTitle();
    outputView.printResult(ranks);
    outputView.printBenefit(benefit.getRate());
  }

  #retry() {
    const lottoMachine = new LottoMachine();
    lottoMachine.play();
  }

  #quit() {
    Console.quit();
  }
}

module.exports = LottoMachine;
