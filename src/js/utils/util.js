export function $(selector) {
  const target = document.querySelector(selector);
  return Object.assign(target, customMethod);
};

const customMethod = {
  clearChildren: function () {
    while (this.hasChildNodes()) {
      this.removeChild(this.firstChild);
    }
  },
  disable: function () {
    this.disabled = true;
  },
  enable: function () {
    this.disabled = false;
  }
};

export function $$(selector) {
  return document.querySelectorAll(selector);
};

export function getRandomNumber(start, end) {
  return Math.round((1 - Math.random()) * (end - start)) + start;
}
