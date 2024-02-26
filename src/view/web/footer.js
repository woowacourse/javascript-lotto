export default function footer(element) {
  const render = (element) => {
    element.innerHTML = `
      <span id="footer-text">Copyright 2023. woowacourse</span>
    `;
  };
  render(element);
}
