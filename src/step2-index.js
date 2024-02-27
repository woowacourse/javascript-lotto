import PurchaseLottoService from './domain/service/PurchaseLottoService';
import '../index.css';
import WinningResultService from './domain/service/WinningResultService';
import CONDITION from './constant/Condition';

document.querySelector('.purchase-form__button').addEventListener('click', purchaseListener);
document.querySelector('.result__button').addEventListener('click', resultButtonListener);
document
  .querySelector('.result-modal-header__close-button')
  .addEventListener('click', closeModalListener);

const CLASSNAME_HIDDEN = 'hidden';

function nextElementSiblings(element) {
  const result = [];
  while (element.nextElementSibling) {
    result.push(element.nextElementSibling);
  }
  return result;
}

function purchaseListener(event) {
  event.preventDefault();

  const SELECTOR_PURCHASE = '.purchase-form__input';
  const SELECTOR_PURCHASED = '.purchased-lotto__list';

  const purchase = document.querySelector(SELECTOR_PURCHASE);
  const purchased = document.querySelector(SELECTOR_PURCHASED);
  const purchaseMoneyString = purchase.value;
  const lottos = new PurchaseLottoService(purchaseMoneyString).getLottos();

  const lottoStrings = lottos.map((lotto) => '🎟️ ' + lotto.join(', '));
  const lottosFragment = makeDivsFragmentFromStrings(lottoStrings);

  [...purchased.children].map((node) => node.remove());
  purchased.append(lottosFragment);
  showWinningPart();
}

function makeDivsFragmentFromStrings(strings) {
  const fragment = document.createDocumentFragment();
  const appendLottoDiv = (string) => {
    const div = document.createElement('div');
    div.textContent = string;
    fragment.appendChild(div);
  };

  strings.forEach((string) => appendLottoDiv(string));
  return fragment;
}

function showWinningPart() {
  const SELECTOR_WINNING_LOTTO = '.winning-lotto';
  const SELECTOR_RESULT = '.result';

  document.querySelector(SELECTOR_WINNING_LOTTO).classList.remove(CLASSNAME_HIDDEN);
  document.querySelector(SELECTOR_RESULT).classList.remove(CLASSNAME_HIDDEN);
}

function resultButtonListener(event) {
  event.preventDefault();

  // TODO : 서비스 연결로직 마무리
  // const lottoNumbers = getLottoNumbers();
  // const winningResults = new WinningResultService(
  //   lottoNumbers,
  //   getWinningNumbers(),
  // ).getWinningResults();

  openResultModal();
}

function openResultModal() {
  document.querySelector('.result-modal').classList.remove(CLASSNAME_HIDDEN);
  document.querySelector('.result-modal-backdrop').classList.remove(CLASSNAME_HIDDEN);
}
function closeResultModal() {
  document.querySelector('.result-modal').classList.add(CLASSNAME_HIDDEN);
  document.querySelector('.result-modal-backdrop').classList.add(CLASSNAME_HIDDEN);
}

function getLottoNumbers() {
  return undefined;
}

function closeModalListener(event) {
  event.preventDefault();
  closeResultModal();
}

function getWinningNumbers() {
  const SELECTOR_WINNING_NUMBERS_INPUTS = '.winning-numbers-inputs';
  const SELECTOR_BONUS_NUMBER_INPUT = '.bonus-number-inputs__input';

  const winningNumberInputs = document.querySelector(SELECTOR_WINNING_NUMBERS_INPUTS);
  const bonusNumberInput = document.querySelector(SELECTOR_BONUS_NUMBER_INPUT);

  const winningNumbers = [...winningNumberInputs.childNodes].map((node) =>
    Number(node.textContent),
  );
  const bonusNumber = Number(bonusNumberInput.textContent);
  return { numbers: winningNumbers, bonusNumber };
}
