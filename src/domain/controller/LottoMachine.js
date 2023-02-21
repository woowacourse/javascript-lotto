const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const Lotto = require('../model/Lotto');
const outputView = require('../../view/outputView');
const { pickRandomNumberInRange } = require('../../utils');
const Console = require('../../utils/Console');
const {
  RANK_INFORMATIONS,
  ERROR_MESSAGE,
  COMMAND_LITERAL,
  LOTTO_NUMBER,
  LOTTO_LITERAL,
  CALCULATION_NUMBER,
} = require('../../constant');

class LottoMachine {
  #winning;

  constructor() {
    this.#winning = new Winning();
  }

  async play() {
    const money = await this.readMoney();
    const lottos = await this.quickPicksLottos(money);
    await this.readWinningNumbers();
    await this.readBonusNumber(money, lottos);
    await this.readRetryOption();
  }

  async readMoney() {
    try {
      const userMoney = await Console.readLine('> 구입금액을 입력해 주세요.');
      const money = new Money(userMoney);
      outputView.printLottoCount(money.getAmount() / LOTTO_NUMBER.moneyUnit);
      return money;
    } catch (error) {
      Console.print(error.message);
      return await this.readMoney();
    }
  }

  async readWinningNumbers() {
    try {
      const userWinningNumbers = await Console.readLine(
        '\n> 당첨 번호를 입력해 주세요.'
      );
      const winningNumbers = userWinningNumbers
        .split(LOTTO_LITERAL.comma)
        .map((winningNumber) => Number(winningNumber));
      this.#winning.setWinningNumbers(winningNumbers);
    } catch (error) {
      Console.print(error.message);
      return await this.readWinningNumbers();
    }
  }

  async readBonusNumber(money, lottos) {
    try {
      const userBonusNumber = await Console.readLine(
        '\n> 보너스 번호를 입력해 주세요.'
      );
      this.#winning.setBonusNumber(Number(userBonusNumber));
      const ranks = this.#getCollectedRanks(lottos);
      const benefit = new Benefit();
      benefit.calculateRate(money.getAmount(), ranks);
      this.#showResult(benefit, ranks);
    } catch (error) {
      Console.print(error.message);
      return await this.readBonusNumber(money, lottos);
    }
  }

  async readRetryOption() {
    try {
      const userCommand = await Console.readLine(
        `\n> 다시 시작하시겠습니까? (${COMMAND_LITERAL.retry}/${COMMAND_LITERAL.quit})`
      );
      this.#checkRetryOption(userCommand);
    } catch (error) {
      Console.print(error.message);
      return await this.readRetryOption();
    }
  }

  async quickPicksLottos(money) {
    const lottos = this.#generateLottos(money.getAmount());
    this.#showLottos(lottos);

    return lottos;
  }

  #checkRetryOption(input) {
    if (input === COMMAND_LITERAL.retry) return this.#retry();
    if (input === COMMAND_LITERAL.quit) return this.#quit();
    throw new Error(ERROR_MESSAGE.retryOption);
  }

  #generateLottos(amount) {
    const lottoCount = amount / LOTTO_NUMBER.moneyUnit;

    return Array.from({ length: lottoCount }).map(
      () => new Lotto(this.#getComposedLottoNumbers())
    );
  }

  #getComposedLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < LOTTO_NUMBER.lottoNumberCount) {
      const randomNumber = pickRandomNumberInRange(
        LOTTO_NUMBER.lottoStart,
        LOTTO_NUMBER.lottoEnd
      );
      lottoNumbers.add(randomNumber);
    }

    return [...lottoNumbers].sort((first, second) => first - second);
  }

  #getCollectedRanks(lottos) {
    const RANK_TEMPLATE = [0, 0, 0, 0, 0];

    const ranks = lottos.reduce((accumulator, lotto) => {
      return this.#getIncreasedRanks(lotto.getLottoNumbers(), accumulator);
    }, RANK_TEMPLATE);

    return ranks;
  }

  #getIncreasedRanks(lotto, ranks) {
    const updatedRanks = ranks;
    const matchedCount = this.#getMatchedCount(lotto);
    const rankIndex = this.#getRankIndex(matchedCount, this.#isBonus(lotto));

    if (rankIndex !== CALCULATION_NUMBER.losing) {
      updatedRanks[rankIndex] += 1;
    }

    return updatedRanks;
  }

  #getMatchedCount(lotto) {
    const winningNumbers = this.#winning.getWinningNumbers();

    return lotto.filter((number) => winningNumbers.includes(number)).length;
  }

  #getRankIndex(matchedCount, isBonus) {
    const rankIndex = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );
    if (rankIndex === CALCULATION_NUMBER.failFindIndex)
      return CALCULATION_NUMBER.losing;

    return rankIndex;
  }

  #isBonus(lotto) {
    return lotto.includes(this.#winning.getBonusNumber());
  }

  #showLottos(lottos) {
    lottos.forEach((lotto) => {
      outputView.printLotto(lotto.getLottoNumbers());
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
