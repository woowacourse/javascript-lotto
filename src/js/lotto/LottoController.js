import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import getPrizeTable from "./constants/prizeTable.js";
import { onModalShow, onModalClose } from "../utils.js";
import { $modal } from "../elements.js";
import {
  isValidPrice,
  isNumbersInRange,
  isDistinctNumbers,
} from "./lotto_validators.js";
import {
  INVALID_PRICE_ERROR,
  INVALID_WINNGNUMBER_ERROR,
  DUPLICATED_WINNINGNUMBER_ERROR,
} from "./constants/error_messages.js";

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
    this.lottoView = new LottoView();
    this.prizeTable = getPrizeTable();
  }

  countMatchedNumbers(lottoNumber, resultNumber) {
    const matchedNumbers = lottoNumber.filter((num) => {
      return resultNumber.indexOf(num) !== -1;
    });

    return matchedNumbers.length;
  }

  getRanking(lottoNumber, winningNumber, bonusNumber) {
    const numOfMatched = this.countMatchedNumbers(lottoNumber, winningNumber);
    switch (numOfMatched) {
      case 3:
        return "ranking5";
      case 4:
        return "ranking4";
      case 5:
        if (this.countMatchedNumbers(lottoNumber, [bonusNumber])) {
          return "ranking2";
        }
        return "ranking3";
      case 6:
        return "ranking1";
      default:
        return "noPrize";
    }
  }

  calculateEarningRate() {
    const totalPrize = Object.values(this.prizeTable).reduce(
      (totalPrize, ranking) => {
        return (totalPrize += ranking.num * ranking.prize);
      },
      0
    );

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
    if (!isNumbersInRange(numbers, 1, 45)) {
      alert(INVALID_WINNGNUMBER_ERROR);
      return;
    }
    if (!isDistinctNumbers(numbers)) {
      alert(DUPLICATED_WINNINGNUMBER_ERROR);
      return;
    }

    this.lottoModel.lottoList.forEach((lotto) => {
      const ranking = this.getRanking(lotto.number, winningNumber, bonusNumber);
      this.prizeTable[ranking].num++;
    });

    this.lottoView.showPrizeTable(this.prizeTable);
    this.lottoView.showEarningRate(this.calculateEarningRate(this.prizeTable));
    onModalShow($modal);
  }

  reset() {
    this.lottoView.resetLottoView();
    this.prizeTable = getPrizeTable();
    onModalClose($modal);
  }
}
