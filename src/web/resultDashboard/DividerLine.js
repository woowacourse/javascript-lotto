import { createElement } from '../utils/dom';

export default function DividerLine(resultContainer) {
  const dividerLine = createElement('div', { class: 'divider-line' });
  resultContainer.appendChild(dividerLine);
}
