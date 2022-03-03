import Store from './flux/store';

import './components/MoneyForm';
import './components/LottoList';
import './components/LottoListToggle';
import './components/LottoItem';
import './components/WinningNumberForm';
import './components/ResultModal';

import '../css/index.css';

const initialState = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: ['', '', '', '', '', ''],
  bonusNumber: 0,
  resultModalVisibility: false,
  result: {
    winningCounts: { fifth: 0, fourth: 0, third: 0, second: 0, first: 0 },
    earningsRate: 0,
  },
};

window.store = new Store(initialState);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <h1 class="text-center mb-4">🎱 행운의 로또</h1>
    <money-form class="mb-7"></money-form>
    <lotto-list class="mb-6" hidden></lotto-list>
    <winning-number-form hidden></winning-number-form>
    <result-modal hidden></result-modal>
  `;
});
