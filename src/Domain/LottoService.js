import LottoManager from './Domain/Model/LottoManager.js';
import WinningLotto from './Domain/Model/WinningLotto.js';
import {
  calculateLottoTickets,
  calculateLottoPrize,
  calculateLottoProfit,
} from './Utils/calculateLotto.js';

class LottoService {
  static initializeLotto(purchaseAmount) {
    const lottoManager = new LottoManager();
    const lottoTickets = calculateLottoTickets(purchaseAmount);
    lottoManager.makeLottoList(lottoTickets);
    return { lottoManager, lottoTickets };
  }

  static initializeWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  static processWinningLotto(lottoManager, winningLotto) {
    const lottoResult = lottoManager.compareWinningLotto(winningLotto);
    const totalLottoPrize = calculateLottoPrize(lottoResult);
    const lottoProfit = calculateLottoProfit(totalLottoPrize, purchaseAmount);
    return { lottoResult, lottoProfit };
  }
}

export default LottoService;
