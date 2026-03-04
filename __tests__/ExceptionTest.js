import readline from 'readline';
import App from '../src/step1/App.js';


describe('구입 금액 입력예외 테스트', () => {
    test('1000원 단위가 아닌 입력예외 테스트', () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['600'];
        });
        const logSpy = jest.spyOn(console, 'log');

        const app = App();
        app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 1000원 단위만 입력 가능합니다.');
    });

    test('정수가 아닌 입력 예외 테스트', () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['ㅁ'];
        });
        const logSpy = jest.spyOn(console, 'log');

        const app = App();
        app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 숫자만 입력해 주세요.');
    });
});
