/**
 * 비동기 함수 핸들러 입니다.
 * this는 해당 함수가 호출 될때, 함수 컨텍스트 생성시에 결정이 됩니다.
 * @param { Function } asyncFn  실행할 비동기 함수
 * @param { object } context  함수가 실행될 컨텍스트
 * @returns { Promise<*> }
 */
const retryOnFailureAsync = async (asyncFn, context) => {
  try {
    return await asyncFn.call(context);
  } catch (error) {
    console.error(error.message);
    return retryOnFailureAsync(asyncFn, context);
  }
};

export default retryOnFailureAsync;
