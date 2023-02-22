require('./style/index.css');

const Benefit = require('./domain/model/Benefit');
const Money = require('./domain/model/Money');
const Winning = require('./domain/model/Winning');
const { getCollectedRanks } = require('./utils/lotto');
const lottoUtils = require('./utils/lotto');

const moneyForm = document.querySelector('.moneyForm');
const moneyAmount = document.querySelector('.moneyAmount');

const lottoInfoContainer = document.querySelector('.lottoInfoContainer');
const lottoNumberConatiner = document.querySelector('.lottoNumberConatiner');
const lottoCount = document.querySelector('.lottoCount');
const inputNumberContainer = document.querySelector('.inputNumberContainer');

const winningNumberInputs = document.querySelectorAll('.winningNumber');

const bonus = document.querySelector('.bonus');

const winningModal = document.querySelector('.winningModal');
const closeButton = document.querySelector('.closeButton');

const rankCounts = document.querySelectorAll('.rankCount');

const benefitRate = document.querySelector('.benefitRate');

const retryButton = document.querySelector('.retryButton');

const footer = document.querySelector('footer');

const moneyError = document.querySelector('.moneyError');
const lottoNumbersError = document.querySelector('.lottoNumbersError');

winningModal.classList.add('hiddenElement');
lottoInfoContainer.classList.add('hiddenElement');
inputNumberContainer.classList.add('hiddenElement');

const addEvents = {
  inputMoney: () => {
    moneyForm.addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        moneyError.innerHTML = '';
        const money = new Money(moneyAmount.value);
        const lottos = lottoUtils.generateLottos(money.getAmount());

        lottoInfoContainer.classList.remove('hiddenElement');
        inputNumberContainer.classList.remove('hiddenElement');

        getLottoCount(money.getAmount() / 1000);

        removeLottos();

        lottos.forEach((item) => getLottoNumbers(item.getLottoNumbers()));

        addEvents.inputNumber(money, lottos);
      } catch (error) {
        const div = getErrorMessage(error.message);
        moneyError.appendChild(div);
      }
    });
  },
  inputNumber: (money, lottos) => {
    inputNumberContainer.addEventListener('submit', (event) => {
      event.preventDefault();

      const winningNumbers = [...winningNumberInputs].map((item) =>
        Number(item.value)
      );

      const bonusNumber = Number(bonus.value);

      try {
        lottoNumbersError.innerHTML = '';
        const winning = new Winning();
        winning.setWinningNumbers(winningNumbers);
        winning.setBonusNumber(bonusNumber);

        winningModal.classList.remove('hiddenElement');

        const ranks = getCollectedRanks(winning, lottos);

        getRankResult(ranks);

        getBenefitRate(money.getAmount(), ranks);
      } catch (error) {
        const div = getErrorMessage(error.message);
        lottoNumbersError.appendChild(div);
      }
    });
  },
};

addEvents.inputMoney();

closeButton.addEventListener('click', () => {
  winningModal.classList.add('hiddenElement');
});

retryButton.addEventListener('click', () => {
  winningModal.classList.add('hiddenElement');
  lottoInfoContainer.classList.add('hiddenElement');
  inputNumberContainer.classList.add('hiddenElement');

  removeLottos();
  resetLottoInputs();
  moneyAmount.focus();
});

const getLottoCount = (count) => {
  lottoCount.innerText = `총 ${count}개를 구매하였습니다.`;
};

const getLottoNumbers = (lottoNumbers) => {
  const div = document.createElement('div');
  const imoticon = document.createElement('span');
  const numbers = document.createElement('span');

  div.className = 'lottoNumber';
  imoticon.innerText = '🎟️';
  imoticon.className = 'imoticion';
  numbers.className = 'text-body';

  numbers.innerText = lottoNumbers.join(', ');
  div.appendChild(imoticon);
  div.appendChild(numbers);

  lottoNumberConatiner.appendChild(div);
};

const getRankResult = (ranks) => {
  rankCounts.forEach(
    (rankCount, index) => (rankCount.innerText = `${ranks[4 - index]}개`)
  );
};

const removeLottos = () => {
  while (lottoNumberConatiner.firstChild) {
    lottoNumberConatiner.removeChild(lottoNumberConatiner.firstChild);
  }
};

const resetLottoInputs = () => {
  winningNumberInputs.forEach((winningInput) => (winningInput.value = ''));
  bonus.value = '';
  moneyAmount.value = '';
};

const getBenefitRate = (money, ranks) => {
  const benefit = new Benefit();
  benefit.calculateRate(money, ranks);
  const rate = benefit.getRate();

  benefitRate.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
};

const getCopyrightCurrentYear = () => {
  footer.innerText = `Copyright ${new Date().getFullYear()}. woowacourse`;
};

const getErrorMessage = (errorMessage) => {
  const div = document.createElement('div');
  div.classList.add('errorMessage');
  div.innerText = errorMessage;
  return div;
};

getCopyrightCurrentYear();
