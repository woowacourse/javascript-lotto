import LottoController from './js/controller/LottoController.js';
// import './css/index.css';

window.addEventListener('DOMContentLoaded', () => {
  const controller = new LottoController();
  controller.subscribeViewEvents();
});
