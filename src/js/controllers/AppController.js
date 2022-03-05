import Controller from '../core/Controller.js';
import LottoModel from '../models/LottoModel.js';
import { LOTTO } from '../configs/contants.js';
import { calculateRateOfReturn } from '../utils/utils.js';

export default class AppController extends Controller {
  init() {
    this.models.lottoModel.init((message) => {
      this.views.ticketSectionView.update(message);
    });

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.views.paymentSectionView.bindOnClickPaymentSubmit(
      this.purchase.bind(this)
    );
    this.views.ticketSectionView.bindOnClickNumberToggle();
    this.views.winningNumberSectionView.bindOnClickShowResultButton(
      this.updateResult.bind(this)
    );
  }

  manualPickLotto(lottoNumbersList) {
    const { lottoList } = this.models.lottoModel.getState();

    this.models.lottoModel.update({
      lottoList: [
        ...lottoList,
        ...lottoNumbersList.map((lottoNumbers) =>
          LottoModel.issueLotto(lottoNumbers)
        ),
      ],
    });

    return this.models.lottoModel.getState();
  }

  autoPickLotto(count) {
    const { lottoList } = this.models.lottoModel.getState();

    this.models.lottoModel.update({
      lottoList: [
        ...lottoList,
        ...Array.from({ length: count }, () => LottoModel.issueLotto()),
      ],
    });

    return this.models.lottoModel.getState();
  }

  purchase(amount) {
    const message = this.autoPickLotto(LottoModel.getLottoCount(amount));

    this.views.ticketSectionView.update(message);
  }

  checkResult(winningNumbers) {
    const { lottoList } = this.models.lottoModel.getState();
    const rankCount = {
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
      fifth: 0,
      none: 0,
    };

    lottoList.forEach((ticket) => {
      const result = ticket.matchWinningNumbers(winningNumbers);

      rankCount[result] += 1;
    });

    const totalPrizes = Object.entries(rankCount).reduce(
      (totalPrizes, [rank, count]) =>
        (totalPrizes += LOTTO.PRIZE[rank] * count),
      0
    );
    const purchaseAmount = lottoList.length * 1000;
    const rateOfReturn = calculateRateOfReturn(totalPrizes, purchaseAmount);

    return {
      rankCount,
      totalPrizes,
      rateOfReturn,
    };
  }

  updateResult(winningNumbers) {
    this.views.ticketSectionView.update(this.checkResult(winningNumbers));
  }
}
