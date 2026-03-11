import STYLE from "../constants/style.js";
import { createElement } from "../service/index.js";

const Header = () => {
  return createElement(
    "header",
    {
      style: `background-color: ${STYLE.COLOR.LOTTO_PRIMARY}; color: ${STYLE.COLOR.LOTTO_GRAYSCALE_1}; padding: 1rem;`,
    },
    createElement(
      "h1",
      {
        style: `font-family: Roboto; font-weight: 800; font-style: ExtraBold; font-size: 24px;`,
      },
      "🎱 행운의 로또",
    ),
  );
};

export default Header;
