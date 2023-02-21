const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const Lotto = require('../model/Lotto');
const outputView = require('../../view/outputView');
const { pickRandomNumberInRange, printErrorAndRetry } = require('../../utils');
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
  #machineInput;

  constructor() {
    this.#machineInput = {
      money: null,
      winning: new Winning(),
    };
  }

  async play() {
    await this.readMoney();
    const lottos = await this.quickPicksLottos();
    // console.log('로또임 ', lottos);
    await this.readWinningNumbers();
    await this.readBonusNumber(lottos);
    await this.readRetryOption();
  }

  async readMoney() {
    try {
      const userMoney = await Console.readLine('> 구입금액을 입력해 주세요.');
      this.#machineInput.money = new Money(userMoney);
      outputView.printLottoCount(
        this.#machineInput.money.getAmount() / LOTTO_NUMBER.moneyUnit
      );
    } catch (error) {
      await printErrorAndRetry(error, () => this.readMoney());
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
      this.#machineInput.winning.setWinningNumbers(winningNumbers);
    } catch (error) {
      await printErrorAndRetry(error, () => this.readWinningNumbers());
    }
  }

  async readBonusNumber(lottos) {
    try {
      const userBonusNumber = await Console.readLine(
        '\n> 보너스 번호를 입력해 주세요.'
      );
      this.#machineInput.winning.setBonusNumber(Number(userBonusNumber));
      const ranks = this.#getCollectedRanks(lottos);
      const benefit = new Benefit();
      benefit.calculateRate(this.#machineInput.money.getAmount(), ranks);
      this.#showResult(benefit, ranks);
    } catch (error) {
      await printErrorAndRetry(error, () => this.readBonusNumber(lottos));
    }
  }

  async readRetryOption() {
    try {
      const userCommand = await Console.readLine(
        `\n> 다시 시작하시겠습니까? (${COMMAND_LITERAL.retry}/${COMMAND_LITERAL.quit})`
      );
      this.#checkRetryOption(userCommand);
    } catch (error) {
      await printErrorAndRetry(error, () => this.readRetryOption());
    }
  }

  async quickPicksLottos() {
    const lottos = this.#generateLottos(this.#machineInput.money.getAmount());
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
      () =>
        new Lotto(
          this.#getComposedLottoNumbers().sort(
            (first, second) => first - second
          )
        )
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

    return [...lottoNumbers];
  }

  #getCollectedRanks(lottos) {
    const RANK_TEMPLATE = [0, 0, 0, 0, 0];
    console.log(lottos);
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
    const winningNumbers = this.#machineInput.winning.getWinningNumbers();

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
    return lotto.includes(this.#machineInput.winning.getBonusNumber());
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
