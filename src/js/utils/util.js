//TODO disable과 enable도 $(selector)의 메소드로 넣어주기

export function $(selector) {
  const target = document.querySelector(selector);
  const $customElement = Object.assign(target, {
    clearChildNodes: function () {
      while (this.hasChildNodes()) {
        this.removeChild(this.firstChild);
      }
    }
  });
  return $customElement;
};

export function $$(selector) {
  return document.querySelectorAll(selector);
};

export function disableElement(selector) {
  $(selector).disabled = true;
}

export function enableElement(selector) {
  $(selector).disabled = false;
}

export function clearInput(selector) {
  $(selector).value = '';
}

export function focusElement(selector) {
  $(selector).focus();
}
