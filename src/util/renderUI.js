export default function renderUI({ elementId, position = 'afterbegin', func }) {
  if (!elementId || typeof elementId !== 'string') {
    throw new Error('Invalid elementId: elementId의 값이 올바르지 않습니다.');
  }

  const validPositions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
  if (!validPositions.includes(position)) {
    throw new Error('Invalid position: position의 값이 올바르지 않습니다.');
  }

  document.getElementById(elementId).insertAdjacentHTML(position, func);
}
