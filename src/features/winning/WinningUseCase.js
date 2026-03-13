import WinningNumber from "../../domain/WinningNumber.js";
import WinningNumberResponseDto from "../dto/WinningNumberResponseDto.js";

export default class WinningUseCase {
  static execute(numbers, bonus) {
    const winningNumber = new WinningNumber(numbers, bonus);

    return new WinningNumberResponseDto(
      winningNumber.getNumbers(),
      winningNumber.getBonusNumber(),
    );
  }
}
