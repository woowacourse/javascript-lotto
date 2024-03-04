import ButtonController from "../class/ButtonController";
import ClassName from "./ClassName";
import Elements from "./Elements";
import addClass from "./addClass";

const hiddenTargets = [
  Elements.SPANS.purchasedLotto,
  Elements.SECTION.purchasedLotto,
  Elements.FORMS.winningLotto,
  Elements.ASIDE.modal,
];

const grantHiddenToHiddenTarget = () => {
  hiddenTargets.forEach((element) => {
    addClass(element, ClassName.visibilityHidden);
  });
};

const initBody = () => {
  ButtonController.deactivateButtons();

  grantHiddenToHiddenTarget();
};

export default initBody;
