import { onModalClose, resetInput } from "../utils.js";
import { $modal, $priceInput } from "../elements.js";

export default class LottoConfirmationController {
  constructor(lottoModel, lottoView) {
    this.lottoModel = lottoModel;
    this.lottoView = lottoView;
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

  countMatchedNumbers(lottoNumber, resultNumber) {
    const matchedNumbers = lottoNumber.filter(
      (num) => resultNumber.indexOf(num) !== -1
    );

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

  onSubmitResultNumber(winningNumber, bonusNumber) {
    this.setPrizeTable(winningNumber, bonusNumber);

    const earningRate = this.calculateEarningRate();
    this.lottoView.showPrizeTable(this.prizeTable);
    this.lottoView.showEarningRate(earningRate);
  }

  onClickRestartButton() {
    resetInput($priceInput);

    this.lottoView.resetLottoView();
    this.lottoModel.resetLottoList();

    onModalClose($modal);
  }
}
