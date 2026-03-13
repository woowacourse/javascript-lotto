import WinningNumber from "../../domain/WinningNumber.js";
import WinningResponseDto from "./WinningResponseDto.js";
export default class WinningUseCase {
  static execute(numbers, bonus) {
    const winningNumber = new WinningNumber(numbers, bonus);

    return new WinningResponseDto(
      winningNumber.getNumbers(),
      winningNumber.getBonusNumber(),
    );
  }
}
