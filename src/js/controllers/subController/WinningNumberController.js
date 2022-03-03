import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { SELECTOR } from '../../configs/contants.js';
import validator from '../../utils/validator.js';

export default class WinningNumberController {
  static createCoincideCountList(lottoNumbersList, winningNumbers, bonus) {
    const countList = lottoNumbersList.map((lottoNumbers) =>
      WinningNumberController.countCoincide(lottoNumbers, winningNumbers, bonus)
    );

    return countList;
  }

  static countCoincide(lottoNumbers, winningNumbers, bonus) {
    let coincideCount = winningNumbers.filter(
      (winningNumber, index) => winningNumber === lottoNumbers[index]
    ).length;

    if (
      WinningNumberController.checkBonus(coincideCount, lottoNumbers, bonus)
    ) {
      coincideCount += 0.5;
    }

    return coincideCount;
  }

  static checkBonus(count, lottoNumbers, bonus) {
    return lottoNumbers.find((number) => number === bonus) && count === 5;
  }

  constructor(controller) {
    this.lottoController = controller;
    this.lottoModel = controller.lottoModel;
    this.winningNumberView = new WinningNumberView(
      SELECTOR.WINNING_NUMBER_SECTION
    );
    this.winningNumberView.render();
    this.setEventHandler();
  }

  setEventHandler() {
    this.winningNumberView.bindOnClickShowResultButton(
      this.didClickShowResultButton.bind(this)
    );
  }

  didClickShowResultButton({ winningNumbers, bonusNumber }) {
    try {
      validator.checkWinningNumberList(winningNumbers);
      validator.checkBonusNumber(bonusNumber);
      this.calculateResult(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  }

  calculateResult(winningNumbers, bonusNumber) {
    const { lottoList } = this.lottoModel.getState();
    const lottoNumbersList = lottoList.map((lotto) => lotto.numbers);
    const coincideCountList = WinningNumberController.createCoincideCountList(
      lottoNumbersList,
      winningNumbers,
      bonusNumber
    );
    this.lottoModel.setWinningStatistic(coincideCountList);
    this.lottoController.afterCalculateResult();
  }

  resetInput() {
    this.winningNumberView.clearInputs();
  }
}
