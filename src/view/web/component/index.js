import LtLottoList from './LtLottoList';
import LtLottoResult from './LtLottoResult';
import LtMoneyInput from './LtMoneyInput';
import LtTextInput from './LtTextInput';
import LtTypography from './LtTypography';
import LtWinningLottoInput from './LtWinningLottoInput';

// NOTE: 의존성의 순서에 맞춰 정렬할 것 (의존성이 없는 것부터 가장 위에)
const components = [
  [LtTextInput, 'lt-text-input'],
  [LtLottoList, 'lt-lotto-list'],
  [LtLottoResult, 'lt-lotto-result'],
  [LtTypography, 'lt-typography'],
  [LtMoneyInput, 'lt-money-input'],
  [LtWinningLottoInput, 'lt-winning-lotto-input'],
];

components.forEach(([component, name]) => {
  customElements.define(name, component);
});

export { LtLottoList, LtLottoResult, LtMoneyInput, LtTextInput, LtTypography, LtWinningLottoInput };
