import domSelector from '../util/dom';
const { lottoPrice } = domSelector;

// input 에는 input 받는 함수 2개랑,
// 화면에 그리는 함수들!
//1. 총 몇개
//2. 생성된 로또번호
//3. 결과 확인 시 테이블

class InputView {
  static inputLottoPrice() {
    return parseInt(lottoPrice.value);
  }

  // innerHtml
}

export default InputView;
