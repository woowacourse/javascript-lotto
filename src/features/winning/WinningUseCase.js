import WinningNumber from "../../domain/WinningNumber.js";
export default class WinningUseCase {
  execute(numbers, bonus) {
    const winningNumber = new WinningNumber(numbers, bonus);
    return winningNumber;
  }
}
