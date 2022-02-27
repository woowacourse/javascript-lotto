import { NUMBER } from '../constants/number';
import { lottoNumberClosure } from '../utils/gameUtil';

class Lotto {
  /** check Validation을 하는 기능이 필요할까 싶었다. */
  /** 사용자의 입력으로 발생하는 것이 아닌, 개발자의 코드로 발생되는 에러라면 굳이 검증할 필요가 있나 싶었습니다. 테스트 파일에서만 유틸함수에 대해 검증하면 프로덕션 코드에서 검증할 필요가 없다고 판단하였습니다. */
  constructor() {
    this.lottoNumbers = this.createLottoNumbers();
  }

  /** 기존 로직 : Set을 활용하여, 중복이 발생한 경우 숫자를 또 받는 로직으로 구현 */
  /** 변경 로직 : 1~45 까지의 숫자가 있는 배열에서 하나하나 뽑아온다 */
  /** 변경 이유 : 중복이 여러번 반복해서 발생하는 경우, 로직의 반복이 너무 많이 될 것 같다. */
  createLottoNumbers() {
    const getLottoNumber = lottoNumberClosure();
    return [...new Array(NUMBER.LOTTO_NUMBER_LENGTH)].map(() => getLottoNumber());
  }
}

export default Lotto;
