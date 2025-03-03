import Validate from './Model/Validate.js';

const input_price = document.querySelector('.input_price');

// 수익률 정보 업데이트
function updateModalResults(modal, winning) {
  const input_price = document.querySelector('.input_price');

  for (const rank in winning.rankHistory) {
    modal.querySelector(`.${rank}`).innerText = winning.rankHistory[rank];
  }
  modal.querySelector('.rate_text').innerText = `당신의 총 수익률은 ${winning.getCalculatedPrizeRate(
    input_price.value,
  )}%입니다.`;
}

// 입력된 당첨 번호와 보너스 번호의 유효성을 검사
function validateWinningNumbers(winningNumbers, bonusNumber) {
  winningNumbers.forEach((number) => Validate.checkLottoNumberRange(number));
  Validate.checkWinningNumberCount(winningNumbers);
  Validate.checkWinningNumberDuplicate(winningNumbers);
  Validate.checkBonusNumberDuplicate(winningNumbers, bonusNumber);
}

// 결과 확인 및 모달 표시
export function handleResultCheck(lottos) {
  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();
    validateWinningNumbers(winningNumbers, bonusNumber);

    const winning = new Winning(winningNumbers, bonusNumber);
    winning.calculateRank(lottos);

    const modal = createModal();
    updateModalResults(modal, winning);
  } catch (error) {
    alert(error.message);
  }
}

// 결과 확인 버튼 UI 생성
export function createResultButton(lottos) {
  const result_button = document.createElement('button');
  result_button.classList.add('result_button');
  result_button.type = 'button';
  result_button.innerText = '결과 확인하기';
  result_button.addEventListener('click', () => handleResultCheck(lottos));
  main_container.appendChild(result_button);
}

// 숫자 입력 UI 생성
function createNumberInput(className) {
  const input_number = document.createElement('input');
  input_number.classList.add('input_number', className);
  input_number.type = 'number';
  validateLottoNumber(input_number);
  return input_number;
}

// 당첨 번호 입력 UI 요소 생성
function createWinningInputUI() {
  const winning_box = document.createElement('div');
  winning_box.classList.add('winning_wrap');
  for (let i = 0; i < LOTTO_NUMBER_LENGTH; i++) {
    winning_box.appendChild(createNumberInput('winning_number'));
  }
  return winning_box;
}

// 보너스 번호 입력 UI 요소 생성
function createBonusInputUI() {
  const bonus_box = document.createElement('div');
  bonus_box.appendChild(createNumberInput('bonus_number'));

  return bonus_box;
}

// 당첨 번호 및 보너스 번호 입력 UI를 화면에 추가
function paintNumberInputs() {
  const main_container = document.getElementById('main_container');
  const number_container = document.createElement('section');
  number_container.classList.add('number_container');
  number_container.appendChild(createWinningInputUI());
  number_container.appendChild(createBonusInputUI());
  main_container.appendChild(number_container);
}

// 입력 안내 UI 생성
function createInputNotice() {
  const main_container = document.getElementById('main_container');
  const winning_container = document.createElement('section');
  const text_notice = document.createElement('p');

  winning_container.classList.add('winning_container');
  text_notice.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  winning_container.appendChild(text_notice);
  main_container.appendChild(winning_container);
}

// 로또 번호 UI 생성
function createLottoBox(lotto) {
  const lotto_box = document.createElement('div');
  lotto_box.classList.add('lotto_box');

  const lotto_img = document.createElement('img');
  lotto_img.src = '/public/img/lotto.png';
  lotto_img.alt = 'lotto image';

  const lotto_number = document.createElement('p');
  lotto_number.textContent = lotto.numbers.join(', ');

  lotto_box.appendChild(lotto_img);
  lotto_box.appendChild(lotto_number);
  return lotto_box;
}

// 로또 수량만큼 UI에 표시
export function paintLottos(lottos) {
  const lotto_container = document.querySelector('.lotto_container');
  lottos.forEach((lotto) => lotto_container.appendChild(createLottoBox(lotto)));
}

// 로또 구매 수량 요소 생성
export function createLottoCountElement(count) {
  const buy_count = document.createElement('p');
  buy_count.innerText = `총 ${count}개를 구매하였습니다.`;
  buy_count.classList.add('buy_count');
  return buy_count;
}

// 로또 컨테이너 생성
function createLottoContainer() {
  const lotto_container = document.createElement('section');
  lotto_container.classList.add('lotto_container');
  return lotto_container;
}

// 로또 구매 수량 UI 생성
function paintLottoCount(lottos) {
  const main_container = document.getElementById('main_container');

  main_container.appendChild(createLottoCountElement(lottos.length));
  main_container.appendChild(createLottoContainer());
}

// 로또 생성
function createLotto() {
  const lottoMachine = new LottoMachine();
  return lottoMachine.generateLotto(input_price.value);
}

// 로또 구매 후 UI 업데이트
function handleLottoPurchase() {
  try {
    Validate.checkIsEmpty(input_price.value);
    Validate.checkIsNumber(input_price.value);
    Validate.checkThousandUnit(input_price.value);
    Validate.checkPriceRange(input_price.value);

    const lottos = createLotto();
    paintLottoCount(lottos);
    paintLottos(lottos);
    createInputNotice();
    paintNumberInputs();
    createResultButton(lottos);
  } catch (error) {
    alert(error.message);
  }
}

// 이벤트 설정
function setupEventListeners() {
  input_price.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') handleLottoPurchase();
  });
  button_price.addEventListener('click', handleLottoPurchase);
}

// 초기화 실행
setupEventListeners();
