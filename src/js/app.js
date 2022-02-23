import Store from './flux/store';
import MoneyForm from './components/MoneyForm';
import LottoList from './components/LottoList';
import LottoItem from './components/LottoItem';

const initialState = {
  money: 0,
  lottoList: [],
};

window.store = new Store(initialState);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <h1>🎱 행운의 로또</h1>
    <money-form></money-form>
    <lotto-list></lotto-list>
  `;
});
