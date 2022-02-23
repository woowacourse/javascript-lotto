import Store from './flux/store';
import MoneyForm from './components/MoneyForm';
import LottoList from './components/LottoList';
import LottoItem from './components/LottoItem';
import LottoListToggle from './components/LottoListToggle';
import WinningNumberForm from './components/WinningNumberForm';

const initialState = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: [],
};

window.store = new Store(initialState);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <h1>🎱 행운의 로또</h1>
    <money-form></money-form>
    <lotto-list hidden></lotto-list>
    <winning-number-form hidden></winning-number-form>
  `;
});
