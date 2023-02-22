/* eslint-disable max-params */
/* eslint-disable no-undef */
const Render = {
  container(id, Container, invoke) {
    const element = document.getElementById(id);
    element.innerHTML = Container();
    invoke(); // 렌더링 시 필요 함수를 실행해줌
  },
};
export default Render;
