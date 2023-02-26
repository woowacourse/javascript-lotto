const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const { getCollectedRanks, generateLottos } = require('../../utils/lotto');
const { LOTTO_NUMBER, LOTTO_LITERAL } = require('../../constant');
const { $, $$ } = require('../../utils');

const EMPTY = '';
const HIDDEN = 'hidden';
const STOP_SCROLL = 'stop-scroll';

const addEvents = {
  inputMoney: () => {
    $('#moneyForm').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const money = new Money(moneyAmount.value);
        const lottos = generateLottos(money.getAmount());
        const count = money.getAmount() / LOTTO_NUMBER.moneyUnit;

        removeLottos();
        $('#moneyError').innerHTML = EMPTY;
        $('#lottoInfoContainer').classList.remove(HIDDEN);
        $('#inputNumberContainer').classList.remove(HIDDEN);

        $('#lottoCount').innerText = `총 ${count}개를 구매하였습니다.`;
        handleLottoContainer(lottos);

        addEvents.inputNumber(money, lottos);
      } catch (error) {
        console.log(error);
        const errorDiv = getErrorMessage(error.message);
        $('#moneyError').appendChild(errorDiv);
      }
    });
  },

  inputNumber: (money, lottos) => {
    $('#inputNumberContainer').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const winningNumbers = [...$$('.winning-number')].map((item) =>
          Number(item.value)
        );
        const bonusNumber = Number($('#bonus').value);
        const winning = new Winning();

        $('#lottoNumbersError').innerHTML = EMPTY;
        winning.setWinningNumbers(winningNumbers);
        winning.setBonusNumber(bonusNumber);

        $('#app').classList.add(STOP_SCROLL);
        $('#winningModal').classList.remove(HIDDEN);

        const ranks = getCollectedRanks(winning, lottos);

        handleRankCount(ranks);
        handleBenefitRate(money.getAmount(), ranks);
      } catch (error) {
        console.log(error);
        const errorDiv = getErrorMessage(error.message);
        $('#lottoNumbersError').appendChild(errorDiv);
      }
    });
  },

  closeModal: () => {
    $('#closeButton').addEventListener('click', () => {
      $('#app').classList.remove(STOP_SCROLL);
      $('#winningModal').classList.add(HIDDEN);
    });
  },

  retry: () => {
    $('#retryButton').addEventListener('click', () => {
      $('#winningModal').classList.add(HIDDEN);
      $('#lottoInfoContainer').classList.add(HIDDEN);
      $('#inputNumberContainer').classList.add(HIDDEN);

      $('#app').classList.remove(STOP_SCROLL);
      removeLottos();
      resetLottoInputs();
      $('#moneyAmount').focus();
    });
  },

  inputChange: () => {
    $('#moneyAmount').addEventListener('input', () => {
      const userValue = $('#moneyAmount').value;
      if (Number(userValue) > 100000) {
        $('#moneyAmount').value = '100000';
      }
      if (Number(userValue) < 0) {
        $('#moneyAmount').value = '1000';
      }
    });

    $$('.winning-number').forEach((item) =>
      item.addEventListener('input', () => {
        const userValue = item.value;
        if (Number(userValue) > 45) {
          item.value = '45';
        }
        if (Number(userValue) < 1) {
          item.value = '1';
        }
      })
    );

    $('#bonus').addEventListener('input', () => {
      const userValue = $('#bonus').value;
      if (Number(userValue) > 45) {
        $('#bonus').value = '45';
      }
      if (Number(userValue) < 1) {
        $('#bonus').value = '1';
      }
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

  $('#benefitRate').innerText = `당신의 총 수익률은 ${rate}%입니다.`;
};

const handleCopyrightCurrentYear = () => {
  $(
    '#copyright'
  ).innerText = `Copyright ${new Date().getFullYear()}. woowacourse`;
};

const handleLottoContainer = (lottos) => {
  lottos.forEach((item) => {
    $('#lottoNumberConatiner').appendChild(
      getLottoNumberNode(item.getLottoNumbers())
    );
  });
};

const handleRankCount = (ranks) => {
  const totalLength = ranks.length - 1;

  $$('.rank-count').forEach((rankCount, index) => {
    const curRankCount = ranks[totalLength - index];
    rankCount.innerText = `${curRankCount}개`;
  });
};

const removeLottos = () => {
  $('#lottoNumberConatiner').innerHTML = EMPTY;
};

const resetLottoInputs = () => {
  $$('.winning-number').forEach((winningInput) => (winningInput.value = EMPTY));
  $('#bonus').value = EMPTY;
  $('#moneyAmount').value = EMPTY;
};

addEvents.inputMoney();
addEvents.closeModal();
addEvents.retry();
addEvents.inputChange();
handleCopyrightCurrentYear();
