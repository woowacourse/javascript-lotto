import eventHandler from './utils/dom/eventHandler.js';
import modal from './utils/dom/modal.js';
import './components/titleSection/TitleSection.js';

const $closeBtn = document.getElementById('closeButton');
const $restartBtn = document.getElementById('restartButton');

const handleCloseModal = () => {
  modal.close();
};

const handleClickRestart = () => {
  modal.close();
  eventHandler.restart();
};

const handleClickOuterModal = e => {
  if (e.target.id === 'modalBackground') modal.close();
};

$closeBtn.addEventListener('click', handleCloseModal);
$restartBtn.addEventListener('click', handleClickRestart);
document.body.addEventListener('click', handleClickOuterModal);
