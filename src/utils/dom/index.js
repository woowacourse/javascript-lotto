import PRIZE from '../../constants/prize';

const dom = {
  $(selector) {
    return document.querySelector(selector);
  },

  create(tagName, id, className, textContent) {
    const tag = document.createElement(tagName);
    if (id) tag.id = id;
    if (className) tag.classList.add(className);
    if (textContent) tag.textContent = textContent;
    return tag;
  },

  createLottoResultTitle() {
    const lottoResultRowTitle = document.createElement('div');
    lottoResultRowTitle.classList.add('lotto-result-row');
    lottoResultRowTitle.classList.add('table-title');
    PRIZE.TABLE_TITLE_LIST.forEach(text => {
      const lottoTableTitle = this.create('div', null, 'lotto-result-cell', text);
      lottoResultRowTitle.appendChild(lottoTableTitle);
    });
    return lottoResultRowTitle;
  },

  createLottoResultTable(ranks) {
    const resultTableFragment = document.createDocumentFragment();
    [PRIZE.FIFTH, PRIZE.FORTH, PRIZE.THIRD, PRIZE.SECOND, PRIZE.FIRST].forEach(rank => {
      const lottoResultRow = this.create('div', null, 'lotto-result-row');
      const lottoMatchedCount = this.create('div', null, 'lotto-result-cell', `${PRIZE.COUNT_OUTPUTS[rank]}`);
      const lottoResultPrize = this.create('div', null, 'lotto-result-cell', `${PRIZE.AMOUNT[rank].toLocaleString()}`);
      const lottoRankCount = this.create('div', null, 'lotto-result-cell', `${ranks[rank]}개`);
      lottoResultRow.appendChild(lottoMatchedCount);
      lottoResultRow.appendChild(lottoResultPrize);
      lottoResultRow.appendChild(lottoRankCount);
      resultTableFragment.appendChild(lottoResultRow);
    });
    return resultTableFragment;
  },
};

export default dom;
