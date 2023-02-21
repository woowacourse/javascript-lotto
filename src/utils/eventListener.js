export function keyUpEventListener(e, button) {
  const { currentTarget } = e;
  const inputs = currentTarget.querySelectorAll('input');

  if ([...inputs.values()].every(({ value }) => value !== '')) {
    button.disabled = false;
    return;
  }

  button.disabled = true;
}
