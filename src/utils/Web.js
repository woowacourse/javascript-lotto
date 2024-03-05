import Dom from './Dom';

/**
 * selector: button, input 두 개의 객체를 입력
 */
const Web = {
  readTagValue(selector) {
    return new Promise((resolve) => {
      const button = Dom.$(selector.button);
      const input = Dom.$(selector.input);

      button.addEventListener('click', () => {
        resolve(input.value);
      });
    });
  },

  readFormInputValue(selector) {
    return new Promise((resolve) => {
      const form = Dom.$(selector.form);
      const input = Dom.$(selector.input);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        resolve(input.value);
      });
    });
  },

  readFormInputValues(selector) {
    return new Promise((resolve) => {
      const form = Dom.$(selector.form);
      const inputs = Dom.$$(selector.inputs);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        resolve(Array.from(inputs).filter((input) => input.value !== '').map((input) => input.value).join(', '));
      });
    });
  },
};

export default Web;
