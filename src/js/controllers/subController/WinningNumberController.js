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

  resetView() {
    this.winningNumberView.clearInputs();
    this.winningNumberView.removeResetButton();
  }

  showResetButton() {
    this.winningNumberView.showResetButton();
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
    const lottoNumbersList = this.getLottoNumbersList();
    const winningStatistic = this.createWinningStatistic(
      lottoNumbersList,
      winningNumbers,
      bonusNumber
    );

    this.lottoModel.setState({ winningStatistic });
    this.lottoController.afterSetWinningStatistic();
  }

  getLottoNumbersList() {
    const { lottoList } = this.lottoModel.getState();

    return lottoList.map((lotto) => lotto.numbers);
  }

  createWinningStatistic(lottoNumbersList, winningNumbers, bonus) {
    const winningStatistic = LottoModel.createEmptyWinningStatistic();

    lottoNumbersList.forEach((lottoNumbers) => {
      const count = this.countSameNumber(lottoNumbers, winningNumbers, bonus);
      if (count < STATISTIC.three.number) {
        return;
      }
      const numberString = this.translateToString(count);
      winningStatistic[numberString] += 1;
    });

    return winningStatistic;
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

  translateToString(count) {
    const statisticDataList = Object.values(STATISTIC);
    const targetData = statisticDataList.find((data) => count === data.number);

    return targetData.numberString;
  }
}
