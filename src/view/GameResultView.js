import { $ } from '../utils/dom';
import ModalTableRow from './components/ModalTableRow';
import { CONSOLE_MESSAGE, PROFIT_PER_RANK } from '../constants/constants';

const GameResultView = {
  render(ranks, profitRate) {
    this.renderTable(ranks);
    this.renderProfitRate(profitRate);
    $('#modal-dialog').style.visibility = 'visible';
  },

  renderTable(ranks) {
    ranks.forEach((lottoCount, index, origin) => {
      const rank = PROFIT_PER_RANK.length - index;
      const correctCount = origin[PROFIT_PER_RANK.length - index - 1];
      $('#modal-tbody').insertAdjacentHTML(
        'afterbegin',
        ModalTableRow(rank, correctCount)
      );
    });
  },

  renderProfitRate(profitRate) {
    $('#modal-profit').innerText = `${CONSOLE_MESSAGE.showProfitRate(
      profitRate
    )}`;
  },

  addRestartClickEvent(clickHandler) {
    $('#modal-restart-btn').addEventListener('click', (e) => {
      e.preventDefault();
      clickHandler();
    });
  },

  addCloseClickEvent(clickHandler) {
    $('#modal-close-btn').addEventListener('click', (e) => {
      e.preventDefault();
      clickHandler();
    });
  },

  close() {
    $('#modal-tbody').innerHTML = '';
    $('#modal-profit').innerHTML = '';
    $('#modal-dialog').style.visibility = 'hidden';
  },
};

export default GameResultView;
