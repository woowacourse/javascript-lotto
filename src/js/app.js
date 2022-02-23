import Store from './flux/store';

import MoneyForm from './components/MoneyForm';
import LottoList from './components/LottoList';
import LottoItem from './components/LottoItem';
import LottoListToggle from './components/LottoListToggle';
import WinningNumberForm from './components/WinningNumberForm';

import '../css/index.css';

const initialState = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: [],
};

window.store = new Store(initialState);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <h1 class="text-center mb-4">🎱 행운의 로또</h1>
    <money-form class="mb-7"></money-form>
    <lotto-list class="mb-6"></lotto-list>
    <winning-number-form></winning-number-form>
  `;
});
