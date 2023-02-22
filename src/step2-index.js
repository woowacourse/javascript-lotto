const Money = require('./domain/model/Money');
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

lottoInfoContainer.classList.add('hiddenElement');
inputNumberContainer.classList.add('hiddenElement');

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
  } catch (error) {
    console.log(error.message);
  }
});

inputNumberContainer.addEventListener('submit', (event) => {
  event.preventDefault();
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
