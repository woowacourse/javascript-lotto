export default function ErrorMessage(id, classNames) {
  const span = document.createElement('span');

  span.setAttribute('id', id);
  span.classList.add(...classNames);

  return span;
}
