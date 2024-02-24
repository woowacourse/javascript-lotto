import { OutputView } from '../views';

const InputController = {
  /**
   * 유효한 값을 받을 때까지 입력값을 받는 기능, 유효하지 않은 입력값일 경우 에러 메세지를 출력
   * @param {()=>void} action
   * @description action:  입력값을 받아와서 유효성 검사를 진행한 후, 검사를 통과하지 못하는 오류를 throw하는 함수
   */
  async retryOnInvalidInput(action) {
    try {
      await action();
    } catch (err) {
      OutputView.printErrorMessage(err);
      await this.retryOnInvalidInput(action);
    }
  },
};

export default InputController;
