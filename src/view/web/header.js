export default function header(element, title) {
  const render = (str) => {
    element.innerHTML = `
    <h1>${str}</h1>
    `;
  };

  render(title);
}
