import PurchaseAmount from "../src/PurchaseAmount";
import ERROR_MESSAGE from '../src/constant/error.js'

describe('PurchaseAmount class', () => {
    describe('구입 금액 예외 처리', () => {
        describe('예외 케이스', () => {
            test("1000으로 나누어 떨어지지 않는 경우", () => {
                expect(() => new PurchaseAmount(1001)).toThrow(ERROR_MESSAGE.NOT_DIVIDED_1000);
            });
            
            test("숫자가 아닌 경우", () => {
                expect(() => new PurchaseAmount('aaa')).toThrow(ERROR_MESSAGE.NOT_A_NUMBER);
            });
            
            test('1000원 미만인 경우', () => {
                expect(() => new PurchaseAmount(999)).toThrow(ERROR_MESSAGE.UNDER_MIN_PRICE);
            })
            
            test('100_000원 초과인 경우', () => {
                expect(() => new PurchaseAmount(100_001)).toThrow(ERROR_MESSAGE.EXCEED_MAX_PRICE);
            })
        })
        describe('정상 케이스', () => {
            test.each([[1_000],[100_000]])("올바른 구입 금액 입력", (price) => {
                expect(() => new PurchaseAmount(price)).not.toThrow();
            });
        })
    })
})

