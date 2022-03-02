import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { SELECTOR } from '../../configs/contants.js';

export default class WinningNumberController {
  static createCoincideCountList(winningNumbers, lottoNumbersList) {
    const countList = lottoNumbersList.map((lottoNumbers) =>
      WinningNumberController.countCoincide(winningNumbers, lottoNumbers)
    );

    return countList;
  }

  static countCoincide(winningNumbers, lottoNumbers) {
    const coincideCount = winningNumbers.filter(
      (winningNumber, index) => winningNumber === lottoNumbers[index]
    ).length;

    return coincideCount;
  }

  constructor() {
    this.winningNumberView = new WinningNumberView(
      SELECTOR.WINNING_NUMBER_SECTION
    );
    this.winningNumberView.render();
  }
}
