import Header from './view/web/Header.js';
import Main from './view/web/Main.js';
import Footer from './view/web/Footer.js';
import Modal from './view/web/Modal.js';
import EventController from './view/web/controller/EventController.js';
import { $ } from './view/web/utils/dom.js';
import './styles/reset.css';
import './styles/index.css';
import './styles/modal.css';

$('#app').appendChild(Header());
$('#app').appendChild(Main());
$('#app').appendChild(Footer());
$('#app').appendChild(Modal());

window.onload = () => {
  const eventController = new EventController();

  const handleCloseBtn = (event) => {
    event.preventDefault();
    $('#modal-container').style.visibility = 'hidden';
  };

  const handleRetryBtn = (event) => {
    event.preventDefault();
    $('#buy-lotto-form').reset();
    $('#winning-lotto-form').reset();
    $('#step2').style.visibility = 'hidden';
    $('#modal-container').style.visibility = 'hidden';
  };

  $('#buy-lotto-form').addEventListener('submit', (event) => eventController.onSubmitBuyForm(event));
  $('#winning-lotto-form').addEventListener('submit', (event) => eventController.handleWinningLottoForm(event));
  $('#close-btn').addEventListener('click', handleCloseBtn);
  $('#retry-btn').addEventListener('click', handleRetryBtn);
};
