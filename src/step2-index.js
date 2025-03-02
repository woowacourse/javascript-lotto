import { calculateRevenue } from './domain/calculateRevenue.js';
import { generateLottos } from './domain/generateLottos.js';
import { getWinningMatchCount } from './domain/getWinningMatchCount.js';
import WinningLotto from './domain/WinningLotto.js';
import { validateBonusNumber, validateWinningNumbers } from './validation/validateLottoNumbers.js';
import { DOM } from './DOM/dom.js';
import { showLottos, showPurchaseResult, showResultsModal } from './view/web/outputHandler.js';
import { handlePurchase } from './view/web/inputHandler.js';
import { errorHandler } from './utils/errorHandler.js';

let purchasePrice = 0;
let lottos = [];
let bonusNumber = 0;
let winningNumbers = [];

DOM.purchaseForm.addEventListener('submit', (event) => {
  handlePurchase(event, (price) => {
    purchasePrice = price;
    const quantity = Math.floor(purchasePrice / 1000);
    showPurchaseResult(quantity);
    lottos = generateLottos(quantity);
    showLottos(lottos);
    DOM.systemMessage.style.display = 'flex';
  });
});

DOM.winningInputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    winningNumbers[index] = value;
  });
});

DOM.bonusInput.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  bonusNumber = value;
});

document.addEventListener('click', (event) => {
  try {
    if (event.target && event.target.id === 'result-button') {
      validateWinningNumbers(winningNumbers);
      validateBonusNumber(winningNumbers)(bonusNumber);
      DOM.bonusInput.disabled = true;
      DOM.bonusInput.style.cursor = 'not-allowed';
      DOM.winningInputs.forEach((input) => {
        input.disabled = true;
        input.style.cursor = 'not-allowed';
      });

      DOM.modal.style.display = 'flex';

      const lottoNumbers = new WinningLotto(winningNumbers, bonusNumber);
      const matchCounts = getWinningMatchCount(lottos, lottoNumbers);
      const revenue = calculateRevenue(matchCounts, purchasePrice);

      showResultsModal(matchCounts, revenue);
    }
  } catch (e) {
    errorHandler(e);
  }

  if (event.target && event.target.classList.contains('modal-close')) {
    DOM.modal.style.display = 'none';
  }

  if (event.target && event.target.id === 'restart-button') {
    location.reload();
  }
});
