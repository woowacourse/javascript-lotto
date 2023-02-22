const Benefit = require('./domain/model/Benefit');
const Lotto = require('./domain/model/Lotto');
const Money = require('./domain/model/Money');
const Winning = require('./domain/model/Winning');
const { getCollectedRanks } = require('./utils/lotto');
const lottoUtils = require('./utils/lotto');

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
require('./style/index.css');

const moneyForm = document.querySelector('.moneyForm');
const moneyAmount = document.querySelector('.moneyAmount');

const lottoInfoContainer = document.querySelector('.lottoInfoContainer');
const lottoNumberConatiner = document.querySelector('.lottoNumberConatiner');
const lottoCount = document.querySelector('.lottoCount');
const inputNumberContainer = document.querySelector('.inputNumberContainer');

const winning1 = document.querySelector('.winning1');
const winning2 = document.querySelector('.winning2');
const winning3 = document.querySelector('.winning3');
const winning4 = document.querySelector('.winning4');
const winning5 = document.querySelector('.winning5');
const winning6 = document.querySelector('.winning6');

const bonus = document.querySelector('.bonus');

const winningModal = document.querySelector('.winningModal');
const closeButton = document.querySelector('.closeButton');

const fifthCount = document.querySelector('.fifthCount');
const fourthCount = document.querySelector('.fourthCount');
const thirdCount = document.querySelector('.thirdCount');
const secondCount = document.querySelector('.secondCount');
const firstCount = document.querySelector('.firstCount');

const benefitRate = document.querySelector('.benefitRate');

winningModal.classList.add('hiddenElement');
lottoInfoContainer.classList.add('hiddenElement');
inputNumberContainer.classList.add('hiddenElement');

const addEvents = {
  inputMoney: () => {
    moneyForm.addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const money = new Money(moneyAmount.value);
        const lottos = lottoUtils.generateLottos(money.getAmount());

        lottoInfoContainer.classList.remove('hiddenElement');
        inputNumberContainer.classList.remove('hiddenElement');

        getLottoCount(money.getAmount() / 1000);

        while (lottoNumberConatiner.firstChild) {
          lottoNumberConatiner.removeChild(lottoNumberConatiner.firstChild);
        }

        lottos.forEach((item) => getLottoNumbers(item.getLottoNumbers()));

        addEvents.inputNumber(money, lottos);
      } catch (error) {
        console.log(error.message);
      }
    });
  },
  inputNumber: (money, lottos) => {
    inputNumberContainer.addEventListener('submit', (event) => {
      event.preventDefault();

      const winningNumbers = [
        winning1.value,
        winning2.value,
        winning3.value,
        winning4.value,
        winning5.value,
        winning6.value,
      ].map((lottoNumber) => Number(lottoNumber));

      const bonusNumber = Number(bonus.value);

      const winning = new Winning();
      winning.setWinningNumbers(winningNumbers);
      winning.setBonusNumber(bonusNumber);

      winningModal.classList.remove('hiddenElement');

      const keys = Object.keys(lottoNumberConatiner.children);

      //   const lottos = keys.map(
      //     (item) =>
      //       new Lotto(
      //         lottoNumberConatiner.children[item].children[1].innerText
      //           .split(',')
      //           .map((lottoNumber) => Number(lottoNumber))
      //       )
      //   );

      const ranks = getCollectedRanks(winning, lottos);

      getRankResult(ranks);

      getBenefitRate(money.getAmount(), ranks);
    });
  },
};

addEvents.inputMoney();

closeButton.addEventListener('click', () => {
  winningModal.classList.add('hiddenElement');
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
  fifthCount.innerText = `${ranks[4]}개`;
  fourthCount.innerText = `${ranks[3]}개`;
  thirdCount.innerText = `${ranks[2]}개`;
  secondCount.innerText = `${ranks[1]}개`;
  firstCount.innerText = `${ranks[0]}개`;
};

const getBenefitRate = (money, ranks) => {
  const benefit = new Benefit();
  benefit.calculateRate(money, ranks);
  const rate = benefit.getRate();

  benefitRate.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
};
