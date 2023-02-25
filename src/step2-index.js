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

const webController = new WebController();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

$('.lotto-container').insertAdjacentHTML('beforeend', Payment());
$('.purchase-button').addEventListener('click', function () {
  const moneyInput = $('#money-input');

  webController.purchaseLotto(Number(moneyInput.value) / LOTTO.UNIT);

  mountLottoList();
  mountWinningInput();

  moneyInput.value = '';

  this.disabled = true;
});

const mountLottoList = () => {
  $('.lotto-container').insertAdjacentHTML(
    'beforeend',
    LottoList(webController.getLottosNumbers()),
  );
};

const mountWinningInput = () => {
  $('.lotto-container').insertAdjacentHTML('beforeend', WinningInput());
  $('.submit-button').addEventListener('click', function () {
    const winNumbers = [];

    $$('.winning-lotto-number').forEach((node) => winNumbers.push(Number(node.value)));

    const bonusNumber = Number($('#bonus-number').value);

    webController.setWinningLotto(winNumbers, bonusNumber);

    mountModal();

    this.disabled = true;
  });
};

const mountModal = () => {
  $('#modal').insertAdjacentHTML('beforeend', Modal(webController.getStatstics()));
  $('#modal').style.display = 'flex';

  $('.restart-button').addEventListener('click', () => restart());
  $('.modal-close-button').addEventListener('click', () => restart());

  document.body.style.overflow = 'hidden';
};

const restart = () => {
  $('#modal').style.display = 'none';
  $('.purchase-button').disabled = false;

  $('.modal-window').remove();
  $('.winning-lotto').remove();
  $('.submit-button').remove();
  $('.lotto-list-wrapper').remove();

  document.body.style.overflow = 'unset';
};
