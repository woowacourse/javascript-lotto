export function $(selector) {
  const target = document.querySelector(selector);
  const $customElement = Object.assign(target, {
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
  });
  return $customElement;
};

export function $$(selector) {
  return document.querySelectorAll(selector);
};

export function clearInput(selector) {
  $(selector).value = '';
}

export function getRandomNumber(start, end) {
  return Math.round((1 - Math.random()) * (end - start)) + start;
}
