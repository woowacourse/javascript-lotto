async function executeRetry(asyncFunc) {
  try {
    return await asyncFunc();
  } catch (error) {
    return alert(error.message);
  }
}
// return 해줘야 모든 6개의 인풋 돌지 않고 에러나면 하나의 alert 창 띄움
// async 로 감싸는 이유: asyncFunc 가 Promise 를 리턴하기 때문에
export default executeRetry;
