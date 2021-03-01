import { onModalClose, resetInput, countIntersection } from "../utils.js";
import { $modal, $priceInput, $earningRate } from "../elements.js";
import { LOTTO_TABLE } from "../constants.js";
import { prizeTable, rankingTable } from "../tables.js";
export default class LottoConfirmationController {
  constructor(lottoModel, lottoView) {
    this.lottoModel = lottoModel;
    this.lottoView = lottoView;
    this.prizeTable = prizeTable;
  }

  checkRanking(lottoNumber, winningNumber, bonusNumber) {
    const matchedNumberCount = countIntersection(lottoNumber, winningNumber);

    if (
      matchedNumberCount === 5 &&
      countIntersection(lottoNumber, [bonusNumber]) === 1
    ) {
      return LOTTO_TABLE.RANKING2.NAME;
    }

    return rankingTable[matchedNumberCount] || LOTTO_TABLE.NO_PRIZE.NAME;
  }

  setPrizeTable(winningNumber, bonusNumber) {
    Object.values(this.prizeTable).forEach((ranking) => (ranking.num = 0)); // reset prizeTable

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
    $earningRate.innerHTML = `당신의 총 수익률은 ${earningRate}%입니다.`;

    this.lottoView.showPrizeTable(this.prizeTable);
  }

  onClickRestartButton() {
    resetInput($priceInput);

    this.lottoView.resetLottoView();
    this.lottoModel.resetLottoList();

    onModalClose($modal);
  }
}
