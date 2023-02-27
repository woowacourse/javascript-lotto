const { LOTTO_LITERAL, LOTTO_NUMBER } = require('../constant');
const { $, $$ } = require('../utils');

const EMPTY = '';
const HIDDEN = 'hidden';
const STOP_SCROLL = 'stop-scroll';

const webView = {
  controllMoneyInput: () => {
    const userValue = $('#moneyAmount').value;
    if (Number(userValue) > LOTTO_NUMBER.moneyLimit) {
      $('#moneyAmount').value = LOTTO_NUMBER.moneyLimit;
    }
    if (Number(userValue) < 0) {
      $('#moneyAmount').value = LOTTO_NUMBER.moneyUnit;
    }
    if (userValue[0] === '0') {
      $('#moneyAmount').value = Number(userValue);
    }
  },

  controllWinningNumber: (inputNode) => {
    const userValue = inputNode.value;
    if (Number(userValue) > LOTTO_NUMBER.lottoEnd) {
      inputNode.value = LOTTO_NUMBER.lottoEnd;
    }
    if (Number(userValue) < 0) {
      inputNode.value = 0;
    }
  },

  focusFirstWinningNumber: () => {
    $$('.winning-number')[0].focus();
  },

  focusMoneyAmount: () => {
    $('#moneyAmount').focus();
  },

  getErrorMessage: (errorMessage) => {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.innerText = errorMessage;
    return errorDiv;
  },

  getLottoNumberNode: (lottoNumbers) => {
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
  },

  hideResultModal: () => {
    $('#app').classList.remove(STOP_SCROLL);
    $('#winningModal').classList.add(HIDDEN);
  },

  showBeginning: () => {
    $('#winningModal').classList.add(HIDDEN);
    $('#lottoInfoContainer').classList.add(HIDDEN);
    $('#inputNumberContainer').classList.add(HIDDEN);
    $('#app').classList.remove(STOP_SCROLL);
    webView.removeLottos();
    $$('.winning-number').forEach(
      (winningInput) => (winningInput.value = EMPTY)
    );
    $('#bonus').value = EMPTY;
    $('#moneyAmount').value = EMPTY;
    webView.focusMoneyAmount();
  },

  showLottoAndWinningInput: () => {
    $('#lottoInfoContainer').classList.remove(HIDDEN);
    $('#inputNumberContainer').classList.remove(HIDDEN);
  },

  showResultModal: () => {
    $('#app').classList.add(STOP_SCROLL);
    $('#winningModal').classList.remove(HIDDEN);
  },

  printBenefitRate: (rate) => {
    $('#benefitRate').innerText = `당신의 총 수익률은 ${rate}%입니다.`;
  },

  printLottoCount: (count) => {
    $('#lottoCount').innerText = `총 ${count}개를 구매하였습니다.`;
  },

  printLotto: (lottos) => {
    lottos.forEach((item) => {
      $('#lottoNumberConatiner').appendChild(
        webView.getLottoNumberNode(item.getLottoNumbers())
      );
    });
  },

  printError: (error, parent) => {
    const errorDiv = webView.getErrorMessage(error.message);
    $(parent).appendChild(errorDiv);
  },

  printRanksCount: (ranks) => {
    const totalLength = ranks.length - 1;

    $$('.rank-count').forEach((rankCount, index) => {
      const curRankCount = ranks[totalLength - index];
      rankCount.innerText = `${curRankCount}개`;
    });
  },

  printCopyright: () => {
    $(
      '#copyright'
    ).innerText = `Copyright ${new Date().getFullYear()}. woowacourse`;
  },

  removeLottos: () => {
    $('#lottoNumberConatiner').innerHTML = EMPTY;
  },

  removeError: (parent) => {
    $(parent).innerHTML = EMPTY;
  },
};

module.exports = webView;
