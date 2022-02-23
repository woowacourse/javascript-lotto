import Store from './flux/store';

const initialState = {};

window.store = new Store(initialState);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <h1>🎱 행운의 로또</h1>
  `;
});
