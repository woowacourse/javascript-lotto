import WinningNumberView from '../../views/subViews/WinningNumberView.js';
import { ERROR_MESSAGE, SELECTOR, STATISTIC } from '../../configs/contants.js';
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

  resetInput() {
    this.winningNumberView.clearInputs();
  }

  setEventHandler() {
    this.winningNumberView.bindOnClickShowResultButton(
      this.didClickShowResultButton.bind(this)
    );
  }

  didClickShowResultButton({ winningNumbers, bonusNumber }) {
    try {
      this.checkLottoList();
      validator.checkWinningNumberList(winningNumbers);
      validator.checkBonusNumber(bonusNumber);
      validator.checkDuplicateBonus(winningNumbers, bonusNumber);
      this.setWinningStatistic(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  }

  checkLottoList() {
    const { lottoList } = this.lottoModel.getState();
    if (lottoList.length === 0) {
      throw new Error(ERROR_MESSAGE.DID_NOT_BUY_LOTTO);
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
    let Count = lottoNumbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    if (this.checkBonus(Count, lottoNumbers, bonus)) {
      Count = STATISTIC.fiveBonus.number;
    }

    return Count;
  }

  checkBonus(count, lottoNumbers, bonus) {
    return (
      count === STATISTIC.five.number &&
      lottoNumbers.find((number) => number === bonus)
    );
  }

  createStatisticWithCountList(CountList) {
    const winningStatistic = LottoModel.createWinningStatistic();

    CountList.forEach((count) => {
      const countString = this.translateToString(count);
      winningStatistic[countString] += 1;
    });

    return winningStatistic;
  }

  translateToString(count) {
    if (count < STATISTIC.three.number) {
      return STATISTIC.under.numberString;
    }

    const statisticDataList = Object.values(STATISTIC);
    const targetData = statisticDataList.find((data) => {
      const { numberString, number } = data;
      if (number === count) {
        return numberString;
      }

      return false;
    });

    return targetData.numberString;
  }
}
