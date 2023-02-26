/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
/* eslint-disable */
import './js/css/style.css';
import WebController from '../src/controller/WebController';
import Payment from './js/components/Payment';
import LottoList from './js/components/LottoList';
import WinningInput from './js/components/WinningInput';
import LOTTO from './constants/lotto';
import Modal from './js/components/Modal';
import { validateBonusNumber, validateNumbers, validatePurchaseAmount } from './domain/validator';

const webController = new WebController();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

$('.lotto-container').insertAdjacentHTML('beforeend', Payment());

const purchaseButton = $('.purchase-button');

purchaseButton.addEventListener('click', () => {
  const moneyInput = $('.money-input');
  const money = Number(moneyInput.value);

  try {
    validatePurchaseAmount(money);
  } catch (error) {
    alert(error.message);
    moneyInput.value = '';
    return;
  }

  webController.purchaseLotto(money / LOTTO.UNIT);

  mountLottoList();
  mountWinningInput();

  moneyInput.disabled = true;
  purchaseButton.disabled = true;
});

const mountLottoList = () => {
  $('.lotto-container').insertAdjacentHTML(
    'beforeend',
    LottoList(webController.getLottosNumbers()),
  );
};

const mountWinningInput = () => {
  $('.lotto-container').insertAdjacentHTML('beforeend', WinningInput());

  const submitButton = $('.submit-button');

  submitButton.addEventListener('click', function () {
    const winNumbers = [];

    $$('.js-winning-number').forEach((node) => winNumbers.push(Number(node.value)));

    const bonusNumber = Number($('.js-bonus-number').value);

    try {
      validateNumbers(winNumbers);
      validateBonusNumber(winNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
      return;
    }

    webController.setWinningLotto(winNumbers, bonusNumber);

    mountModal();

    submitButton.disabled = true;
  });
};

const mountModal = () => {
  $('#modal').insertAdjacentHTML('beforeend', Modal(webController.getStatstics()));
  $('#modal').style.display = 'flex';

  $('.restart-button').addEventListener('click', restart);
  $('.modal-close-button').addEventListener('click', restart);

  document.body.style.overflow = 'hidden';
};

const restart = () => {
  $('#modal').style.display = 'none';
  $('.purchase-button').disabled = false;

  const moneyInput = $('.money-input');
  moneyInput.value = '';
  moneyInput.disabled = false;

  $('.modal-window').remove();
  $('.winning-lotto').remove();
  $('.submit-button').remove();
  $('.lotto-list-wrapper').remove();

  document.body.style.overflow = 'visible';
};
