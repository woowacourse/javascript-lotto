/* eslint-disable max-params */
/* eslint-disable no-undef */
const Container = {
  render(id, html, invoke) {
    const element = document.getElementById(id);
    element.innerHTML = html();
    invoke?.(); // 렌더링 시 필요 함수를 실행해줌
  },
};
export default Container;
