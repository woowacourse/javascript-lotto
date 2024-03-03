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

renderUI('purchase-before', 'afterbegin', generatePurchaseInputHTML());

const purchaseAmount = document.querySelector('.lp-pa-input-group');
const purchaseAmountButton = document.querySelector('.lp-pa-input-btn');
const findPurchaseInfoHTML = document.getElementById('purchase-after');

purchaseAmountButton.addEventListener('click', (event) => {
  event.preventDefault();
  const inputMoney = document.querySelector('.lp-pa-input-amount').valueAsNumber;
  try {
    const money = new Money(Number(inputMoney));
    const lottoMachine = new LottoMachine(money.count);
    removeErrorMessage();
    printPurchaseInfoHTML(findPurchaseInfoHTML, money.count, lottoMachine.lottos);
    handleClickLottoResult(lottoMachine, money);
  } catch (error) {
    onError(purchaseAmount, error.message);
  }
});

function handleClickLottoResult(lottoMachine, money) {
  const printLottoResultButton = document.querySelector('.lp-winning-floating-btn');
  printLottoResultButton.addEventListener('click', (event) => {
    event.preventDefault();
    executionWinningAndBonusNumbers(lottoMachine, money);
  });
}

// TODO: 에러 나는 부분 빨간 박스 처리해주기
// TODO: 로또 출력 많을 때, 더보기 버튼으로 접었다 폈다 하기
// TODO: 당첨 번호 입력할 때, autoFocusing 및 하나 입력하면 다음 input으로 포커싱해주기
function executionWinningAndBonusNumbers(lottoMachine, money) {
  const winningBonusNumbersGroup = document.querySelector('.lp-nig-number-input-group');
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
  renderUI('statistics-modal', 'afterbegin', generateStatisticsModalHTML(lottoRanks, totalProfitRate));
}

function inputWinningAndBonusNumbers(lottoMachine) {
  const extractionWinningNumbers = new Array(6)
    .fill(0)
    .map((_, idx) => document.getElementById(`winningNumber${idx + 1}`).value);
  const inputBonusNumber = document.getElementById('bonusNumber').value;
  const inputWinningNumber = extractionWinningNumbers.filter((num) => num.trim() !== '');
  lottoMachine.winningLotto = inputWinningNumber.join(',');
  lottoMachine.bonusNumber = inputBonusNumber;
}

function printPurchaseInfoHTML(findPurchaseInfoHTML, count, lottos) {
  if (!findPurchaseInfoHTML) {
    renderUI('purchase-after', 'afterbegin', generatePurchaseInfoHTML(count, lottos));
  }
  if (findPurchaseInfoHTML) {
    findPurchaseInfoHTML.innerHTML = generatePurchaseInfoHTML(count, lottos);
  }
}

function retryLotto() {
  const retryButton = document.querySelector('.lm-retry-btn');
  retryButton.addEventListener('click', () => {
    window.location.reload();
  });
}
