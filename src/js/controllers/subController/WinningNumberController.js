import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { SELECTOR, STATISTIC } from '../../configs/contants.js';
import validator from '../../utils/validator.js';
import LottoModel from '../../models/LottoModel.js';

export default class WinningNumberController {
  init(controller) {
    this.lottoController = controller;
    this.lottoModel = controller.lottoModel;
    this.winningNumberView = new WinningNumberView(
      SELECTOR.WINNING_NUMBER_SECTION
    );
    this.winningNumberView.render();
    this.setEventHandler();
  }

  resetInputs() {
    this.winningNumberView.clearInputs();
  }

  showResetButton() {
    this.winningNumberView.appearResetButton();
  }

  setEventHandler() {
    this.winningNumberView.bindOnClickShowResultButton(
      this.didClickShowResultButton.bind(this)
    );
    this.winningNumberView.bindOnClickResetButton(
      this.didClickResetButton.bind(this)
    );
  }

  didClickResetButton() {
    this.lottoController.afterClickedResetButton();
  }

  didClickShowResultButton({ winningNumbers, bonusNumber }) {
    try {
      validator.checkWinningAndBonusNumbers(winningNumbers, bonusNumber);
      validator.checkLottoListExist(this.lottoModel.getState().lottoList);
      this.setWinningStatistic(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  }

  setWinningStatistic(winningNumbers, bonusNumber) {
    const { lottoList } = this.lottoModel.getState();
    const lottoNumbersList = lottoList.map((lotto) => lotto.numbers);
    const countList = this.createCountList(
      lottoNumbersList,
      winningNumbers,
      bonusNumber
    );
    const winningStatistic = this.createStatisticWithCountList(countList);

    this.lottoModel.setState({ winningStatistic });
    this.lottoController.afterSetWinningStatistic();
  }

  createCountList(lottoNumbersList, winningNumbers, bonus) {
    const countList = lottoNumbersList.map((lottoNumbers) =>
      this.countSameNumber(lottoNumbers, winningNumbers, bonus)
    );

    return countList;
  }

  countSameNumber(lottoNumbers, winningNumbers, bonus) {
    let count = lottoNumbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    if (this.checkBonus(count, lottoNumbers, bonus)) {
      count = STATISTIC.fiveBonus.number;
    }

    return count;
  }

  checkBonus(count, lottoNumbers, bonus) {
    return (
      count === STATISTIC.five.number &&
      lottoNumbers.find((number) => number === bonus)
    );
  }

  createStatisticWithCountList(countList) {
    const winningStatistic = LottoModel.createWinningStatistic();

    countList.forEach((count) => {
      if (count < STATISTIC.three.number) {
        return;
      }
      const countString = this.translateToString(count);
      winningStatistic[countString] += 1;
    });

    return winningStatistic;
  }

  translateToString(count) {
    const statisticDataList = Object.values(STATISTIC);
    const targetData = statisticDataList.find((data) => count === data.number);

    return targetData.numberString;
  }
}
