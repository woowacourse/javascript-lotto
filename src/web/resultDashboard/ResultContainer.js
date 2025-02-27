import { LOTTO } from '../../domain/lottoConstants';
import { createElement } from '../utils/dom';
import DividerLine from './DividerLine';
import ResultCols from './ResultCols';
import ResultRow from './ResultRow';

export default function ResultContainer(resultDashboard, matchCounts) {
  const resultContainer = createElement('div');

  DividerLine(resultContainer);
  ResultCols(resultContainer);
  DividerLine(resultContainer);

  RowsOfTotalResult(resultContainer, matchCounts);

  resultContainer.className = 'result-container';
  resultDashboard.appendChild(resultContainer);
}

function RowsOfTotalResult(resultContainer, matchCounts) {
  resultContainer.appendChild(ResultRow('3개', '5,000', matchCounts[LOTTO.THREE_MATCH]));
  DividerLine(resultContainer);
  resultContainer.appendChild(ResultRow('4개', '50,000', matchCounts[LOTTO.FOUR_MATCH]));
  DividerLine(resultContainer);
  resultContainer.appendChild(ResultRow('5개', '1,500,000', matchCounts[LOTTO.FIVE_MATCH]));
  DividerLine(resultContainer);
  resultContainer.appendChild(ResultRow('5개+보너스볼', '30,000,000', matchCounts[LOTTO.FIVE_WITH_BONUS_MATCH_IDX]));
  DividerLine(resultContainer);
  resultContainer.appendChild(ResultRow('6개', '2,000,000,000', matchCounts[LOTTO.SIX_MATCH]));
  DividerLine(resultContainer);
}
