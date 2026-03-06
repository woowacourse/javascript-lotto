import { Lotto } from '../src/step1/Lotto';


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
