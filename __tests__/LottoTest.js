import { Lotto, WinningLotto } from '../src/step1/Lotto.js';


describe('로또 클래스 테스트', () => {
    test('로또 번호에 중복되는 번호가 존재할때', () => {
        expect(() => {
            new Lotto([1, 2, 2, 3, 4, 5]);
        }).toThrow('중복 당첨 번호 입력은 불가 합니다.');
    });

    test.each([
        [[1, 2, 3, 4, 5, 46], [0, 1, 2, 3, 4, 5]]
    ])('1 ~ 45 이내 숫자가 아닌 번호가 존재할때', (number) => {
        expect(() => {
            new Lotto(number)
        }).toThrow('1 ~ 45 이내 숫자만 입력 가능합니다.');
    });

    test.each([
        [
            ['a', 1, 2, 3, 4, 5],
            ['안톨리니', '코브', 40, 41, 42, 43],
            [' ', '/', '-', 4, 5, 6],
        ]
    ])('정수가 아닌 번호가 존재할때', (number) => {
        expect(() => {
            new Lotto(number)
        }).toThrow('당첨 번호는 숫자만 입력 가능합니다.');
    });
});

describe('당첨 로또 클래스 테스트', () => {
    test.each([
        [
            ['d', ' ', '\\', '코브', '안톨리니']
        ]
    ])('보너스 번호가 숫자가 아닐때', (bonusNumber) => {
        expect(() => {
            new WinningLotto([1, 2, 3, 4, 5, 6], bonusNumber);
        }).toThrow('보너스 번호는 숫자여야 합니다.');
    });

    test.each([
        [46, 0]
    ])('보너스 번호가 1 ~ 45 이내 숫자가 아닐때', (bonusNumber) => {
        console.log(bonusNumber);
        expect(() => {
            new WinningLotto([1, 2, 3, 4, 5, 6], bonusNumber);
        }).toThrow('보너스 번호는 1 ~ 45 이내 숫자여야 합니다.');
    });

    test('보너스 번호가 당첨번호와 중복될 때', () => {
        expect(() => {
            new WinningLotto([1, 2, 3, 4, 5, 6], 3);
        }).toThrow('보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    });
});
