/* eslint-disable max-params */
/* eslint-disable no-undef */
const Common = {
  initContainer(id, Container, invoke) {
    const element = document.getElementById(id);
    element.innerHTML = Container();
    invoke();
  }
};
export default Common;
