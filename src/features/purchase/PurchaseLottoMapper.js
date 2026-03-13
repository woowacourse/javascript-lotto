import PurchaseLottoResponseDto from "./PurchaseLottoResponseDto.js";

export default class PurchaseLottoMapper {
  static toDto(lottos, money) {
    const rawLottos = lottos.map((lotto) => lotto.getNumbers());
    const amount = money.getAmount();

    return new PurchaseLottoResponseDto(rawLottos, amount);
  }
}
