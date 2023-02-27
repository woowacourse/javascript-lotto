const Money = require('../model/Money');
const Winning = require('../model/Winning');
const consoleView = require('../../view/consoleView');
const Console = require('../../utils/Console');
const lottoUtils = require('../../utils/lotto');
const {
  ERROR_MESSAGE,
  COMMAND_LITERAL,
  LOTTO_NUMBER,
  LOTTO_LITERAL,
} = require('../../constant');
const { getBenefitRate } = require('../../utils/lotto');

class LottoMachine {
  async play() {
    const money = await this.readMoney();
    const lottos = lottoUtils.generateLottos(money.getAmount());
    this.#showLottos(lottos);
    const winning = new Winning();
    const winningNumbers = await this.readWinningNumbers();
    winning.setWinningNumbers(winningNumbers);
    const bonusNumber = await this.readBonusNumber(winning);
    winning.setBonusNumber(bonusNumber);
    const ranks = lottoUtils.getCollectedRanks(winning, lottos);
    const benefitRate = getBenefitRate(money.getAmount(), ranks);
    this.#showResult(benefitRate, ranks);
    await this.readRetryOption();
  }

  async readMoney() {
    try {
      const userMoney = await Console.readLine('> 구입금액을 입력해 주세요.');
      const money = new Money(userMoney);
      consoleView.printLottoCount(money.getAmount() / LOTTO_NUMBER.moneyUnit);

      return money;
    } catch (error) {
      Console.print(error.message);
      const money = await this.readMoney();

      return money;
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
      const winning = new Winning();
      winning.setWinningNumbers(winningNumbers);

      return winningNumbers;
    } catch (error) {
      Console.print(error.message);
      const winningNumbers = await this.readWinningNumbers();

      return winningNumbers;
    }
  }

  async readBonusNumber(winning) {
    try {
      const userBonusNumber = await Console.readLine(
        '\n> 보너스 번호를 입력해 주세요.'
      );
      const bonusNumber = Number(userBonusNumber);
      winning.setBonusNumber(bonusNumber);

      return bonusNumber;
    } catch (error) {
      Console.print(error.message);
      const bonusNumber = await this.readBonusNumber(winning);

      return bonusNumber;
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
      await this.readRetryOption();
    }
  }

  #checkRetryOption(input) {
    if (input === COMMAND_LITERAL.retry) return this.#retry();
    if (input === COMMAND_LITERAL.quit) return this.#quit();
    throw new Error(ERROR_MESSAGE.retryOption);
  }

  #showLottos(lottos) {
    lottos.forEach((lotto) => {
      consoleView.printLotto(lotto.getLottoNumbers());
    });
  }

  #showResult(benefitRate, ranks) {
    consoleView.printResultTitle();
    consoleView.printResult(ranks);
    consoleView.printBenefit(benefitRate);
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
