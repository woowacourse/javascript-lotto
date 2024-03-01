/**
 * 주어진 작업을 안전하게 수행하고, 에러 처리 및 정리 작업을 관리하는 함수.
 * @param {Function} action 실행할 작업을 담은 함수.
 * @param {Function} errorHandler 에러 발생 시 실행할 처리 로직을 담은 함수.
 * @param {Function} finalAction 항상 실행해야 하는 마무리 작업을 담은 함수.
 */

const safeEventHandlerWithAlertError = (action, errorHandler = null, finalAction = null) => {
  try {
    action();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    }
  } finally {
    if (finalAction) {
      finalAction();
    }
  }
};

export default safeEventHandlerWithAlertError;
