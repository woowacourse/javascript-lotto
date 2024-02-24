import Console from '../../utils/console.js';
import { deepFreeze } from '../../utils/object/object.js';

/**
 * @module RetryHandler
 * 시스템 작업 중 발생하는 예외 처리 및 재 실행을 위한 모듈
 */
const RetryHandler = deepFreeze({
  /**
   * 제공된 비동기 함수를 실행 후 오류가 발생하지 않을 때 까지 오류 메시지를 출력하고 함수를 재 실행
   * @template T
   * @param {Function} executeFunction - 실행할 비동기 함수
   * @returns {Promise<T>} 비동기 함수가 성공적으로 완료되면 그 결과를 반환
   */
  async errorWithLogging(executeFunction) {
    try {
      return await executeFunction();
    } catch (error) {
      Console.print(error.message);
      return this.errorWithLogging(executeFunction);
    }
  },
});

export default RetryHandler;
