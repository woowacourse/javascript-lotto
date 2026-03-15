import WinningNumber from "../../domain/WinningNumber.js";
export default class WinningUseCase {
  static execute(numbers, bonus) {
    const winningNumber = new WinningNumber(numbers, bonus);
    return winningNumber;
  }
}
