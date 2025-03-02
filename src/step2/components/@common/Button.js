import Component from "../../core/Component";

export default class Button extends Component {
  template() {
    const {
      size = "medium",
      text,
      className = "",
      type = "button",
    } = this.props;

    const sizeStyle = {
      small: "button-small",
      medium: "button-medium",
      large: "button-large",
    };

    return `
      <button class="button ${sizeStyle[size]} ${className}" type="${type}">
        ${text}
      </button>
    `;
  }

  setEvent() {
    const { onClick } = this.props;
    if (onClick) {
      this.addEvent("click", ".button", onClick);
    }
  }
}
