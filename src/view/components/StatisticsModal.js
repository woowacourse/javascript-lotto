const { CONSOLE_MESSAGE } = require('../../js/constants/constants');

const MODAL_CLOSE_BUTTON = document.createElement('button');
MODAL_CLOSE_BUTTON.setAttribute('id', 'modal-close-btn');
MODAL_CLOSE_BUTTON.innerText = 'X';

const MODAL_TITLE = document.createElement('h2');
MODAL_TITLE.innerText = `${CONSOLE_MESSAGE.RESULT_HEADER}`;

const MODAL_TABLE_HEADER = `
    <thead>
        <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
        </tr>
    </thead>
`;

const PROFIT_MSG = `${CONSOLE_MESSAGE.showProfitRate(40)}`;

const MODAL_SPAN_PROFIT = document.createElement('span');
MODAL_SPAN_PROFIT.setAttribute('id', 'modal-profit');
MODAL_SPAN_PROFIT.innerText = PROFIT_MSG;

const MODAL_RESTART_BUTTON = document.createElement('button');
MODAL_RESTART_BUTTON.setAttribute('id', 'modal-restart-btn');
MODAL_RESTART_BUTTON.innerText = '다시 시작하기';

module.exports = {
  MODAL_CLOSE_BUTTON,
  MODAL_TITLE,
  MODAL_TABLE_HEADER,
  MODAL_SPAN_PROFIT,
  MODAL_RESTART_BUTTON,
};
