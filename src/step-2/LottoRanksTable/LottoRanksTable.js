import { RANK_RULES } from '../../constants/rank.js';

const LottoRanksTable = {
  render(container, { ranks }) {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');

    const ths = this.createThs();
    const bodyRows = this.createBodyRows(ranks);

    table.id = 'lotto-ranks-table';
    table.classList.add('lotto-ranks-table');

    caption.innerText = '🏆 당첨 통계 🏆';
    caption.classList.add('text-lotto-subtitle');

    ths.forEach((th) => tr.appendChild(th));
    thead.appendChild(tr);

    bodyRows.forEach((row) => tbody.appendChild(row));

    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
  },

  createThs() {
    return ['일치 갯수', '당첨금', '당첨 갯수'].map((header) => {
      const th = document.createElement('th');
      th.innerText = header;
      th.scope = 'col';
      return th;
    });
  },

  createBodyRows(ranks) {
    return RANK_RULES.map((rule) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');

      const bonusNumberText = rule.hasBonusNumber ? '+보너스볼' : '';

      td1.innerText = `${rule.matchCount}개${bonusNumberText}`;
      td2.innerText = rule.prize.toLocaleString();
      td3.innerText = `${ranks[rule.rank]}개`;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      return tr;
    }).reverse();
  },
};

export default LottoRanksTable;
