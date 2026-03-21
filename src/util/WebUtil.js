class WebUtil {
  renderElement({ parentElement, tagName, html, ...attrs }) {
    if (attrs.className && document.querySelector(`.${attrs.className}`)) {
      document.querySelector(`.${attrs.className}`).remove();
    }

    const elements = document.createElement(tagName);
    const properties = [];

    for (let prop in elements) {
      properties.push(prop);
    }

    Object.entries(attrs).forEach(([key, value]) => {
      if (properties.includes(key)) elements[key] = value;
    });

    if (html) elements.insertAdjacentHTML("afterbegin", html);

    parentElement.appendChild(elements);

    return elements;
  }

  handleEventAsync({element, eventName, eventHandler, cleanupHandler}) {
    return new Promise((resolve) => {
      element.addEventListener(eventName, (e) => {
        const result = eventHandler(e);
        resolve(result);
        if (cleanupHandler) cleanupHandler();
      });
    });
  }
}

export default WebUtil;
