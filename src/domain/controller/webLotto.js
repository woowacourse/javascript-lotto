const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const { getCollectedRanks, generateLottos } = require('../../utils/lotto');
const { LOTTO_NUMBER, LOTTO_LITERAL } = require('../../constant');

const app = document.querySelector('#app');

const moneyForm = document.querySelector('#moneyForm');
const moneyAmount = document.querySelector('#moneyAmount');

const lottoInfoContainer = document.querySelector('#lottoInfoContainer');
const lottoNumberConatiner = document.querySelector('#lottoNumberConatiner');
const lottoCount = document.querySelector('#lottoCount');
const inputNumberContainer = document.querySelector('#inputNumberContainer');

const winningNumberInputs = document.querySelectorAll('.winning-number');
const bonus = document.querySelector('#bonus');

const winningModal = document.querySelector('#winningModal');
const closeButton = document.querySelector('#closeButton');
const rankCounts = document.querySelectorAll('.rank-count');
const benefitRate = document.querySelector('#benefitRate');
const retryButton = document.querySelector('#retryButton');

const copyright = document.querySelector('#copyright');

const moneyError = document.querySelector('#moneyError');
const lottoNumbersError = document.querySelector('#lottoNumbersError');

const EMPTY = '';
const HIDDEN = 'hidden';
const STOP_SCROLL = 'stop-scroll';

const addEvents = {
  inputMoney: () => {
    moneyForm.addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const money = new Money(moneyAmount.value);
        const lottos = generateLottos(money.getAmount());
        const count = money.getAmount() / LOTTO_NUMBER.moneyUnit;

        removeLottos();
        moneyError.innerHTML = EMPTY;
        lottoInfoContainer.classList.remove(HIDDEN);
        inputNumberContainer.classList.remove(HIDDEN);

        lottoCount.innerText = `총 ${count}개를 구매하였습니다.`;
        handleLottoContainer(lottos);

        addEvents.inputNumber(money, lottos);
      } catch (error) {
        const errorDiv = getErrorMessage(error.message);
        moneyError.appendChild(errorDiv);
      }
    });
  },

  inputNumber: (money, lottos) => {
    inputNumberContainer.addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const winningNumbers = [...winningNumberInputs].map((item) =>
          Number(item.value)
        );
        const bonusNumber = Number(bonus.value);
        const winning = new Winning();

        lottoNumbersError.innerHTML = EMPTY;
        winning.setWinningNumbers(winningNumbers);
        winning.setBonusNumber(bonusNumber);

        app.classList.add(STOP_SCROLL);
        winningModal.classList.remove(HIDDEN);

        const ranks = getCollectedRanks(winning, lottos);

        handleRankCount(ranks);
        handleBenefitRate(money.getAmount(), ranks);
      } catch (error) {
        const errorDiv = getErrorMessage(error.message);
        lottoNumbersError.appendChild(errorDiv);
      }
    });
  },

  closeModal: () => {
    closeButton.addEventListener('click', () => {
      app.classList.remove(STOP_SCROLL);
      winningModal.classList.add(HIDDEN);
    });
  },

  retry: () => {
    retryButton.addEventListener('click', () => {
      winningModal.classList.add(HIDDEN);
      lottoInfoContainer.classList.add(HIDDEN);
      inputNumberContainer.classList.add(HIDDEN);

      app.classList.remove(STOP_SCROLL);
      removeLottos();
      resetLottoInputs();
      moneyAmount.focus();
    });
  },
};

const getErrorMessage = (errorMessage) => {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.innerText = errorMessage;
  return errorDiv;
};

const getLottoNumberNode = (lottoNumbers) => {
  const lottoWrap = document.createElement('div');
  const imoticon = document.createElement('span');
  const lotto = document.createElement('span');

  lottoWrap.className = 'lotto-number';
  imoticon.className = 'imoticion';
  lotto.className = 'text-body';

  imoticon.innerText = '🎟️';
  lotto.innerText = lottoNumbers.join(LOTTO_LITERAL.separator);

  lottoWrap.appendChild(imoticon);
  lottoWrap.appendChild(lotto);

  return lottoWrap;
};

const handleBenefitRate = (money, ranks) => {
  const benefit = new Benefit();
  benefit.calculateRate(money, ranks);
  const rate = benefit.getRate();

  benefitRate.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
};

const handleCopyrightCurrentYear = () => {
  copyright.innerText = `Copyright ${new Date().getFullYear()}. woowacourse`;
};

const handleLottoContainer = (lottos) => {
  lottos.forEach((item) => {
    lottoNumberConatiner.appendChild(
      getLottoNumberNode(item.getLottoNumbers())
    );
  });
};

const handleRankCount = (ranks) => {
  const totalLength = ranks.length - 1;

  rankCounts.forEach((rankCount, index) => {
    const curRankCount = ranks[totalLength - index];
    rankCount.innerText = `${curRankCount}개`;
  });
};

const removeLottos = () => {
  lottoNumberConatiner.innerHTML = EMPTY;
};

const resetLottoInputs = () => {
  winningNumberInputs.forEach((winningInput) => (winningInput.value = EMPTY));
  bonus.value = EMPTY;
  moneyAmount.value = EMPTY;
};

winningModal.classList.add(HIDDEN);
lottoInfoContainer.classList.add(HIDDEN);
inputNumberContainer.classList.add(HIDDEN);

addEvents.inputMoney();
addEvents.closeModal();
addEvents.retry();
handleCopyrightCurrentYear();
