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
};

export default Web;
