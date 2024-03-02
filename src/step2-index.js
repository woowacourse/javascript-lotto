import Header from './view/web/header/Header.js';
import Main from './view/web/main/Main.js';
import Footer from './view/web/footer/Footer.js';
import Modal from './view/web/modal/Modal.js';
import EventController from './view/web/controller/EventController.js';
import { $ } from './view/web/utils/dom.js';
import './view/web/styles/reset.css';
import './view/web/styles/index.css';

$('#app').appendChild(Header());
$('#app').appendChild(Main());
$('#app').appendChild(Footer());
$('#app').appendChild(Modal());

window.onload = () => {
  const eventController = new EventController();

  $('#buy-lotto-form').addEventListener('submit', (event) => eventController.onSubmitBuyForm(event));
  $('#winning-lotto-form').addEventListener('submit', (event) => eventController.handleWinningLottoForm(event));
  $('#dimmer').addEventListener('click', (event) => eventController.handleCloseButton(event));
  $('#close-btn').addEventListener('click', (event) => eventController.handleCloseButton(event));
  $('#retry-btn').addEventListener('click', (event) => eventController.handleRetryButton(event));
};
