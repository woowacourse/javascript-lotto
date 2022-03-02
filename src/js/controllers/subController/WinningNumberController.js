import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { SELECTOR } from '../../configs/contants.js';

export default class WinningNumberController {
  static createCoincideCountList(winningNumbers, lottoNumbersList) {
    const countList = lottoNumbersList.map((lottoNumbers) => {
      return WinningNumberController.calculateCoincideCount(
        winningNumbers,
        lottoNumbers
      );
    });

    return countList;
  }

  static calculateCoincideCount(winningNumbers, lottoNumbers) {
    const coincideList = winningNumbers.filter(
      (winningNumber, index) => winningNumber === lottoNumbers[index]
    );

    return coincideList.length;
  }

  constructor() {
    this.winningNumberView = new WinningNumberView(
      SELECTOR.WINNING_NUMBER_SECTION
    );
    this.winningNumberView.render();
  }
}
