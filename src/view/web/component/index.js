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

// 몽키 패치: Shadow Tree내의 DOM이 host를 참조하려면
// this.getRootNode().host 와 같이 참조해야 했으나,
// HTMLElement에 host라는 getter를 추가하여 this.host를
// 사용하여 단축 접근이 가능하도록 구현
Object.defineProperty(HTMLElement.prototype, 'host', {
  get: function () {
    return this.getRootNode().host;
  },
});

components.forEach(([component, name]) => {
  customElements.define(name, component);
});

export { LtLottoList, LtLottoResult, LtMoneyInput, LtTextInput, LtTypography, LtWinningLottoInput };
