import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { SELECTOR } from '../../configs/contants.js';

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

  constructor() {
    this.winningNumberView = new WinningNumberView(
      SELECTOR.WINNING_NUMBER_SECTION
    );
    this.winningNumberView.render();
  }
}
