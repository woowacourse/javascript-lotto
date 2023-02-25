export function keyUpEventListener(e, button) {
  const { currentTarget } = e;
  const inputs = currentTarget.querySelectorAll('input');

  const everyFilled = [...inputs.values()].every(({ value }) => value !== '');

  // if (everyFilled && e.keyCode === 13) button.click();

  if (everyFilled) {
    button.disabled = false;
    return;
  }

  button.disabled = true;
}
