import Validations from "../src/Validations";

describe("Validations 단위 테스트", () => {
  
  test("구입금액이 숫자인지 판별하는 함수 테스트", () => {
    const buyMoney = 'aiden'
    
    expect(Validations.isBuyMoneyNumber(buyMoney)).toBeFalsy();
  });

  test("구입금액이 양의 정수인지 판별하는 함수 테스트", () => {
    const buyMoney = -2000
    
    expect(Validations.isPositiveInteger(buyMoney)).toBeFalsy();
  });

  test("구입금액이 1000으로 나누어 떨어지는지 판별하는 함수 테스트", () => {
    const buyMoney = 200
    
    expect(Validations.isDevidedByThousand(buyMoney)).toBeFalsy();
  });

});
