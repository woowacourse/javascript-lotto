import LottoMachine from '../domain/LottoMachine';
import Money from '../domain/Money';
import calculateROI from '../util/calculateROI';
import generateStatisticsModalHTML from '../../static/html/generateStatisticsModalHTML';
import generatePurchaseInfoHTML from '../../static/html/generatePurchaseInfoHTML';
import generatePurchaseInputHTML from '../../static/html/generatePurchaseInputHTML';
import onError from '../util/onError';
import renderUI from '../util/renderUI';
import removeErrorMessage from '../util/removeErrorMessage';
import clickToCloseModal from '../util/clickToCloseModal';

renderUI({ elementId: 'purchase-before', func: generatePurchaseInputHTML() });

const purchaseAmount = document.getElementById('purchase-input-group');
const purchaseAmountButton = document.getElementById('purchase-input-btn');
const findPurchaseInfoHTML = document.getElementById('purchase-after');

purchaseAmountButton.addEventListener('click', (event) => {
  event.preventDefault();
  const inputMoney = document.getElementById('purchase-amount').valueAsNumber;
  try {
    const money = new Money(inputMoney);
    const lottoMachine = new LottoMachine(money.count);
    removeErrorMessage();
    printPurchaseInfoHTML(findPurchaseInfoHTML, money.count, lottoMachine.lottos);
    handleClickLottoResult(lottoMachine, money);
  } catch (error) {
    onError(purchaseAmount, error.message);
  }
});

function handleClickLottoResult(lottoMachine, money) {
  const printLottoResultButton = document.getElementById('display-result-btn');
  printLottoResultButton.addEventListener('click', (event) => {
    event.preventDefault();
    executionWinningAndBonusNumbers(lottoMachine, money);
  });
}

function executionWinningAndBonusNumbers(lottoMachine, money) {
  const winningBonusNumbersGroup = document.getElementById('winning-bonus-number-input-group');
  try {
    inputWinningAndBonusNumbers(lottoMachine);
    removeErrorMessage();
    printLottoResultsAndProfitRate(lottoMachine, money);
    clickToCloseModal('lm-close-btn');
    clickToCloseModal('modal-body');
    retryLotto();
  } catch (error) {
    onError(winningBonusNumbersGroup, error.message);
  }
}

function printLottoResultsAndProfitRate(lottoMachine, money) {
  const lottoRanks = lottoMachine.countLottoRanks();
  const totalProfitRate = calculateROI(money, lottoRanks);
  renderUI({
    elementId: 'statistics-modal',
    func: generateStatisticsModalHTML(lottoRanks, totalProfitRate),
  });
}

function inputWinningAndBonusNumbers(lottoMachine) {
  const winningRes = insertWinningNumbers(lottoMachine);
  if (winningRes.existError) {
    throw new Error(winningRes.error.message);
  }
  const bonusRes = insertBonusNumber(lottoMachine);
  if (bonusRes.existError) {
    throw new Error(bonusRes.error.message);
  }
}

function insertWinningNumbers(lottoMachine) {
  try {
    const extractionWinningNumbers = new Array(6)
      .fill(0)
      .map((_, idx) => document.getElementById(`winningNumber${idx + 1}`).value);
    const inputWinningNumber = extractionWinningNumbers.filter((num) => num.trim() !== '');
    lottoMachine.winningLotto = inputWinningNumber.join(',');
    removeErrorLine();
    return { existError: false };
  } catch (error) {
    document.querySelector('.lp-nig-winning-box').classList.add('error-line');
    return { existError: true, error };
  }
}

function insertBonusNumber(lottoMachine) {
  try {
    const inputBonusNumber = document.getElementById('bonusNumber').value;
    lottoMachine.bonusNumber = inputBonusNumber;
    removeErrorLine();
    return { existError: false };
  } catch (error) {
    document.querySelector('.lp-nig-bonus-box').classList.add('error-line');
    return { existError: true, error };
  }
}

function printPurchaseInfoHTML(findPurchaseInfoHTML, count, lottos) {
  if (!findPurchaseInfoHTML) {
    renderUI({ elementId: 'purchase-after', func: generatePurchaseInfoHTML(count, lottos) });
  }
  if (findPurchaseInfoHTML) {
    findPurchaseInfoHTML.innerHTML = generatePurchaseInfoHTML(count, lottos);
  }
}

function retryLotto() {
  const retryButton = document.getElementById('retry-btn');
  retryButton.addEventListener('click', () => {
    window.location.reload();
  });
}

function removeErrorLine() {
  const errorTag = document.querySelector('.error-line');
  if (errorTag) {
    errorTag.classList.remove('error-line');
  }
}
