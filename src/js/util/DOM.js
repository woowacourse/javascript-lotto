/* eslint-disable max-lines-per-function */

export const $ = (() => {
  const constructor = function (selector) {
    if (!selector) {
      return;
    }
    this.targets = document.querySelectorAll(selector);
    this.target = this.targets.length === 1 && this.targets[0];
  };

  constructor.prototype.each = function (callBack) {
    if (!callBack || typeof callBack !== 'function') {
      return;
    }

    this.targets.forEach((target, idx) => callBack(target, idx));

    return this;
  };

  constructor.prototype.addClass = function (className) {
    this.each(target => target.classList.add(className));

    return this;
  };

  constructor.prototype.removeClass = function (className) {
    this.each(target => target.classList.remove(className));

    return this;
  };

  constructor.prototype.toggleClass = function (className) {
    this.each(target => target.classList.toggle(className));

    return this;
  };

  constructor.prototype.setEvent = function (type, eventHandler) {
    this.each(target => target.addEventListener(type, eventHandler));

    return this;
  };

  constructor.prototype.getValue = function () {
    return this.target.value;
  };

  constructor.prototype.setValue = function (value) {
    this.each(target => {
      target.value = value;
    });
  };

  constructor.prototype.enable = function () {
    this.each(target => {
      target.disabled = false;
    });
  };

  constructor.prototype.disable = function () {
    this.each(target => {
      target.disabled = true;
    });
  };

  constructor.prototype.show = function () {
    this.each(target => {
      target.style.display = 'block';
    });
  };

  constructor.prototype.hide = function () {
    this.each(target => {
      target.style.display = 'none';
    });
  };

  constructor.prototype.innerText = function (text) {
    this.each(target => {
      target.innerText = text;
    });
  };

  constructor.prototype.innerHTML = function (html) {
    this.each(target => {
      target.innerHTML = html;
    });
  };

  constructor.prototype.isCheckedInput = function () {
    return this.target.checked;
  };

  const instantiate = selector => {
    return new constructor(selector);
  };

  return instantiate;
})();
