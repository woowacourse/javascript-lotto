/* eslint-disable max-lines-per-function */

export const $ = (() => {
  class DOM {
    constructor(selector, parentNode) {
      if (!selector) {
        return;
      }
      this.targets = parentNode.querySelectorAll(selector);
      this.target = this.targets.length === 1 && this.targets[0];
    }

    each(callBack) {
      if (!callBack || typeof callBack !== 'function') {
        return;
      }

      this.targets.forEach((target, idx) => callBack(target, idx));

      return this;
    }

    map(callBack) {
      if (!callBack || typeof callBack !== 'function') {
        return;
      }

      return [...this.targets].map((target, idx) => callBack(target, idx));
    }

    filter(callBack) {
      if (!callBack || typeof callBack !== 'function') {
        return;
      }

      return [...this.targets].filter((target, idx) => callBack(target, idx));
    }

    setEvent(type, eventHandler) {
      this.each(target => target.addEventListener(type, eventHandler));

      return this;
    }

    addClass(className) {
      this.each(target => target.classList.add(className));

      return this;
    }

    removeClass(className) {
      this.each(target => target.classList.remove(className));

      return this;
    }

    toggleClass(className) {
      this.each(target => target.classList.toggle(className));

      return this;
    }

    getValue() {
      return this.target.value;
    }

    setValue(value) {
      this.each(target => {
        target.value = value;
      });
    }

    enable() {
      this.each(target => {
        target.disabled = false;
      });
    }

    disable() {
      this.each(target => {
        target.disabled = true;
      });
    }

    show() {
      this.each(target => {
        target.style.display = 'block';
      });
    }

    hide() {
      this.each(target => {
        target.style.display = 'none';
      });
    }

    innerText(text) {
      this.each(target => {
        target.innerText = text;
      });
    }

    innerHTML(html) {
      this.each(target => {
        target.innerHTML = html;
      });
    }

    isCheckedInput() {
      return this.target.checked;
    }
  }

  const instantiate = (selector, parentNode = document) => {
    return new DOM(selector, parentNode);
  };

  return instantiate;
})();
