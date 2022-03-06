import Controller from '../core/Controller.js';
import LottoModel from '../models/LottoModel.js';
import { LOTTO } from '../configs/contants.js';
import { calculateRateOfReturn } from '../utils/utils.js';

export default class AppController extends Controller {
  init() {
    this.initModels();
    this.bindEventHandlers();
  }

  initModels() {
    this.models.lottoModel.init((message) => {
      this.views.paymentSectionView.update(message);
      this.views.ticketSectionView.update(message);
      this.views.winningNumberSectionView.update(message);
    });
  }

  bindEventHandlers() {
    this.views.paymentSectionView.bindOnClickPaymentSubmit(
      this.purchase.bind(this)
    );
    this.views.ticketSectionView.bindOnClickNumberToggle();
    this.views.winningNumberSectionView.bindOnInputWinningNumberInput();
    this.views.winningNumberSectionView.bindOnClickShowResultButton(
      this.updateResult.bind(this)
    );
    this.views.resultModalWindowView.bindOnClickModalOverlay(
      this.initModels.bind(this)
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
    this.models.lottoModel.init();
    const message = this.autoPickLotto(LottoModel.getLottoCount(amount));

    this.views.ticketSectionView.update(message);
    this.views.winningNumberSectionView.update(message);
  }

  countMatchedTickets(lottoList, winningNumbers) {
    const rankCount = {};

    Object.keys(LOTTO.PRIZE).forEach((rank) => {
      if (rank) rankCount[rank] = 0;
    });

    lottoList.forEach((ticket) => {
      const rank = ticket.matchWinningNumbers(winningNumbers);

      if (rank) rankCount[rank] += 1;
    });

    return rankCount;
  }

  sumPrize(rankCount) {
    return Object.entries(rankCount).reduce((sum, [rank, count]) => {
      const amount = LOTTO.PRIZE[rank].AMOUNT;

      return sum + amount * count;
    }, 0);
  }

  checkResult(winningNumbers) {
    const { lottoList } = this.models.lottoModel.getState();
    const rankCount = this.countMatchedTickets(lottoList, winningNumbers);
    const totalPrizes = this.sumPrize(rankCount);
    const purchaseAmount = lottoList.length * 1000;
    const rateOfReturn = calculateRateOfReturn(totalPrizes, purchaseAmount);

    return {
      rankCount,
      totalPrizes,
      rateOfReturn,
    };
  }

  updateResult(winningNumbers) {
    this.views.resultModalWindowView.update(this.checkResult(winningNumbers));
    this.views.resultModalWindowView.showModalWindow();
  }
}
