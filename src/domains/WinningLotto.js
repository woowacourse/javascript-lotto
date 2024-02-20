import LottoValidator from './LottoValidator';
// 숫자를 가짐
// 발행 로또, 당첨 로또
// 발행 로또 티켓 => 로또 배열
// 당첨 => 딩첨 번호(로떠) , 보너스 번호
class WinningLotto {
  #numbers;

  #bonusNumber;

  constructor(numbers) {
    LottoValidator.validate(numbers);
    this.#numbers = numbers;
  }
}

export default WinningLotto;
