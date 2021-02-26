import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import { RANKINGS, PRIZE_TABLE } from "./constants/prizeTable.js";
import { onModalShow, onModalClose } from "../utils.js";
import { $modal } from "../elements.js";
import { isValidPrice, isDistinctNumbers } from "./lotto_validators.js";
import {
  INVALID_PRICE_ERROR,
  DUPLICATED_WINNINGNUMBER_ERROR,
} from "./constants/error_messages.js";

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
    this.lottoView = new LottoView();
    this.rankedCount = null;

    this.initRankedCount();
  }

  initRankedCount() {
    this.rankedCount = {};
    Object.values(RANKINGS).forEach((ranking) => {
      this.rankedCount[ranking] = 0;
    });
  }

  countMatchedNumbers(lottoNumber, resultNumber) {
    return lottoNumber.reduce((count, num) => {
      return resultNumber.includes(num) ? count + 1 : count;
    }, 0);
  }

  getRanking(lottoNumber, winningNumber, bonusNumber) {
    const numOfMatched = this.countMatchedNumbers(lottoNumber, winningNumber);
    switch (numOfMatched) {
      case 3:
        return RANKINGS.RANKING5;
      case 4:
        return RANKINGS.RANKING4;
      case 5:
        if (this.countMatchedNumbers(lottoNumber, [bonusNumber])) {
          return RANKINGS.RANKING2;
        }
        return RANKINGS.RANKING3;
      case 6:
        return RANKINGS.RANKING1;
      default:
        return RANKINGS.NO_PRIZE;
    }
  }

  calculateEarningRate() {
    const totalPrize = Object.values(RANKINGS).reduce((totalPrize, ranking) => {
      return (totalPrize +=
        this.rankedCount[ranking] * PRIZE_TABLE[ranking].prize);
    }, 0);

    return Math.round((totalPrize / this.lottoModel.price) * 100);
  }

  purchase(price) {
    if (!isValidPrice(price)) {
      alert(INVALID_PRICE_ERROR);
      this.lottoView.resetLottoView();

      return;
    }

    this.lottoModel.buy(price);
    this.lottoView.showConfirmation(this.lottoModel.lottoList);
  }

  toggleLottoNumbers(checked) {
    checked
      ? this.lottoView.showTicketDetails(this.lottoModel.lottoList)
      : this.lottoView.showTickets(this.lottoModel.lottoList.length);
  }

  openPrizeTableModal(winningNumber, bonusNumber) {
    const numbers = [...winningNumber, bonusNumber];
    if (!isDistinctNumbers(numbers)) {
      alert(DUPLICATED_WINNINGNUMBER_ERROR);
      return;
    }

    this.lottoModel.lottoList.forEach((lotto) => {
      const ranking = this.getRanking(lotto.number, winningNumber, bonusNumber);
      this.rankedCount[ranking]++;
    });

    this.lottoView.showPrizeTable(this.rankedCount);
    this.lottoView.showEarningRate(this.calculateEarningRate(this.rankedCount));
    onModalShow($modal);
  }

  reset() {
    this.lottoView.resetLottoView();
    this.initRankedCount();
    onModalClose($modal);
  }
}
