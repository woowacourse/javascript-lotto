import LtLottoList from './LtLottoList';
import LtLottoResult from './LtLottoResult';
import LtMoneyInput from './LtMoneyInput';
import LtTextInput from './LtTextInput';
import LtTypography from './LtTypography';
import LtWinningLottoInput from './LtWinningLottoInput';

function toKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const components = [
  LtLottoList,
  LtLottoResult,
  LtMoneyInput,
  LtTextInput,
  LtTypography,
  LtWinningLottoInput,
];

components.forEach((component) => {
  customElements.define(toKebabCase(component.name), component);
});

export { LtLottoList, LtLottoResult, LtMoneyInput, LtTextInput, LtTypography, LtWinningLottoInput };
