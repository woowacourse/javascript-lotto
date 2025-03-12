import LottoManager from './Model/LottoManager.js';
import WinningLotto from './Model/WinningLotto.js';
import {
  calculateLottoTickets,
  calculateLottoPrize,
  calculateLottoProfit,
} from '../Utils/calculateLotto.js';
import { generateRandomLottoNumbers } from '../Utils/lottoNumberGenerator.js';
import {
  validatePurchaseAmount,
  validateLottoNumbers,
  validateBonusNumber,
} from '../Validation/validateDomain.js';

class LottoService {
  #lottoManager;
  #purchaseAmount;

  constructor() {
    this.#lottoManager = new LottoManager();
  }

  initializeLotto(purchaseAmount) {
    validatePurchaseAmount(purchaseAmount);
    this.#purchaseAmount = purchaseAmount;
    const lottoTickets = calculateLottoTickets(purchaseAmount);
    this.#lottoManager.makeLottoList(lottoTickets, generateRandomLottoNumbers);
    return lottoTickets;
  }

  createWinningLotto(winningNumbers, bonusNumber) {
    validateLottoNumbers(winningNumbers);
    validateBonusNumber(bonusNumber, winningNumbers);
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  compareWithWinningLotto(winningLotto) {
    return this.#lottoManager.compareWinningLotto(winningLotto);
  }

  calculateProfit(lottoResult) {
    const totalLottoPrize = calculateLottoPrize(lottoResult);
    return calculateLottoProfit(totalLottoPrize, this.#purchaseAmount);
  }

  getLottoManager() {
    return this.#lottoManager;
  }
}

export default LottoService;
