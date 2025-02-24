import LottoManager from './Model/LottoManager.js';
import WinningLotto from './Model/WinningLotto.js';
import {
  calculateLottoTickets,
  calculateLottoPrize,
  calculateLottoProfit,
} from '../Utils/calculateLotto.js';
import { generateRandomLottoNumbers } from '../Utils/lottoNumberGenerator.js';

class LottoService {
  static initializeLotto(purchaseAmount) {
    const lottoManager = new LottoManager();
    const lottoTickets = calculateLottoTickets(purchaseAmount);
    lottoManager.makeLottoList(lottoTickets, generateRandomLottoNumbers);
    return { lottoManager, lottoTickets };
  }

  static initializeWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  static compareWinningLotto(lottoManager, winningLotto) {
    const lottoResult = lottoManager.compareWinningLotto(winningLotto);
    return lottoResult;
  }

  static processWinningLotto(lottoResult, purchaseAmount) {
    const totalLottoPrize = calculateLottoPrize(lottoResult);
    const lottoProfit = calculateLottoProfit(totalLottoPrize, purchaseAmount);
    return lottoProfit;
  }
}

export default LottoService;
