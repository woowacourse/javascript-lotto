import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import { onModalShow } from "../utils.js";
import { $modal } from "../elements.js";
import {
  INVALID_PRICE_ERROR,
  INVALID_WINNGNUMBER_ERROR,
  DUPLICATED_WINNINGNUMBER_ERROR,
} from "../constants.js";

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
    this.lottoView = new LottoView();
    this.prizeTable = {
      ranking1: {
        num: 0,
        prize: 2000000000,
        condition: "6개",
      },
      ranking2: {
        num: 0,
        prize: 30000000,
        condition: "5개 + 보너스볼",
      },
      ranking3: {
        num: 0,
        prize: 1500000,
        condition: "5개",
      },
      ranking4: {
        num: 0,
        prize: 50000,
        condition: "4개",
      },
      ranking5: {
        num: 0,
        prize: 5000,
        condition: "3개",
      },
      noPrize: {
        num: 0,
        prize: 0,
        condition: "2개 이하",
      },
    };
  }

  isValidPrice(price) {
    return price > 0 && price % 1000 === 0; // price는 1000원 단위의 양수여야 한다.
  }

  isNumbersInRange(numbers, min, max) {
    return numbers.every((num) => min <= num && max >= num);
  }

  isDistinctNumbers(numbers) {
    const numbersSet = new Set(numbers);

    return numbersSet.size === numbers.length;
  }

  countMatchedNumbers(lottoNumber, resultNumber) {
    const matchedNumbers = lottoNumber.filter((num) => {
      return resultNumber.indexOf(num) !== -1;
    });

    return matchedNumbers.length;
  }

  checkRanking(lottoNumber, winningNumber, bonusNumber) {
    const numOfMatched = this.countMatchedNumbers(lottoNumber, winningNumber);
    switch (numOfMatched) {
      case 3:
        return "ranking5";
      case 4:
        return "ranking4";
      case 5:
        if (this.countMatchedNumbers(lottoNumber, [bonusNumber]) === 1) {
          return "ranking2";
        }
        return "ranking3";
      case 6:
        return "ranking1";
      default:
        return "noPrize";
    }
  }

  setPrizeTable(winningNumber, bonusNumber) {
    this.lottoModel.lottoList.forEach((lotto) => {
      const ranking = this.checkRanking(
        lotto.number,
        winningNumber,
        bonusNumber
      );
      this.prizeTable[ranking].num++;
    });
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

  onSubmitPrice(price) {
    if (!this.isValidPrice(price)) {
      alert(INVALID_PRICE_ERROR);
      this.lottoView.resetLottoView();

      return;
    }
    this.lottoModel.buy(price);
    this.lottoView.showConfirmation(this.lottoModel.lottoList);
  }

  onToggleLottoNumbers(e) {
    e.target.checked
      ? this.lottoView.showTicketDetails(this.lottoModel.lottoList)
      : this.lottoView.showTickets(this.lottoModel.lottoList.length);
  }

  onSubmitResultNumber(winningNumber, bonusNumber) {
    const numbers = [...winningNumber, bonusNumber];
    if (!this.isNumbersInRange(numbers, 1, 45)) {
      alert(INVALID_WINNGNUMBER_ERROR);

      return;
    }
    if (!this.isDistinctNumbers(numbers)) {
      alert(DUPLICATED_WINNINGNUMBER_ERROR);

      return;
    }

    this.setPrizeTable(winningNumber, bonusNumber);

    const earningRate = this.calculateEarningRate();
    this.lottoView.showPrizeTable(this.prizeTable);
    this.lottoView.showEarningRate(earningRate);

    onModalShow($modal);
  }
}
