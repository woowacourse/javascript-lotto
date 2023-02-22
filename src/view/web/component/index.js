import LtLottoList from './LtLottoList';
import LtLottoResult from './LtLottoResult';
import LtMoneyInput from './LtMoneyInput';
import LtTextInput from './LtTextInput';
import LtTypography from './LtTypography';
import LtWinningLottoInput from './LtWinningLottoInput';

function toKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// NOTE: 의존성의 순서에 맞춰 정렬할 것 (의존성이 없는 것부터 가장 위에)
const components = [
  LtTextInput,
  LtLottoList,
  LtLottoResult,
  LtTypography,
  LtMoneyInput,
  LtWinningLottoInput,
];

components.forEach((component) => {
  customElements.define(toKebabCase(component.name), component);
});

export { LtLottoList, LtLottoResult, LtMoneyInput, LtTextInput, LtTypography, LtWinningLottoInput };
