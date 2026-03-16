import PurchaseLottoMapper from "../../../../src/features/purchase/PurchaseLottoMapper.js";
import PurchaseLottoResponseDto from "../../../../src/features/purchase/PurchaseLottoResponseDto.js";

describe("PurchaseLottoMapper 테스트", () => {
  test("도메인 객체들을 받아 PurchaseLottoResponseDto로 올바르게 변환한다", () => {
    const mockLottos = [
      { getNumbers: () => [1, 2, 3, 4, 5, 6] },
      { getNumbers: () => [7, 8, 9, 10, 11, 12] },
    ];
    const mockMoney = { getAmount: () => 2000 };

    const dto = PurchaseLottoMapper.toDto(mockLottos, mockMoney);
    expect(dto).toBeInstanceOf(PurchaseLottoResponseDto);
    expect(dto.lottos).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);

    expect(dto.purchasedAmount).toBe(2000);
  });

  test("로또 리스트가 비어있을 때도 빈 배열을 가진 DTO를 반환한다", () => {
    const mockLottos = [];
    const mockMoney = { getAmount: () => 0 };

    const dto = PurchaseLottoMapper.toDto(mockLottos, mockMoney);
    expect(dto.lottos).toEqual([]);
    expect(dto.purchasedAmount).toBe(0);
  });
});
