const Input = {
  render(container, { id, type, inputMode, name, placeholder, style }) {
    const input = document.createElement('input');

    input.id = id;
    input.type = type;
    input.inputMode = inputMode;
    input.name = name;
    input.placeholder = placeholder;
    input.style = style;

    container.appendChild(input);
  },
};

export default Input;
