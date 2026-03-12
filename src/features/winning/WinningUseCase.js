import WinningNumber from "../../domain/WinningNumber.js";

// 매개변수 제한으로 static (추가 기능시 인스턴스로 변경 후 파사드해야할듯?)
export default class WinningUseCase {
  static execute(numbers, bonus) {
    const winningNumber = new WinningNumber(numbers, bonus);
    return winningNumber;
  }
}
