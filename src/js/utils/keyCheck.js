const moveReverseFocus = (e) => {
  const { activeElement } = document;
  const eventTarget = e.target;
  if (activeElement.id === 'bonus-number' && activeElement.value.length <= 1) {
    activeElement.value = '';
    $('#last-basic-input').focus();
    return;
  }
  if (eventTarget.previousElementSibling && activeElement.value.length <= 1) {
    eventTarget.value = '';
    eventTarget.previousElementSibling.focus();
  }
};

export default moveReverseFocus;
