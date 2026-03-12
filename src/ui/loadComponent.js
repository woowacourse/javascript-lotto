const loadComponent = (id, path) => {
  return fetch(path)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).insertAdjacentHTML("beforeend", data);
      return loadNestedComponents(document.getElementById(id));
    });
};

const loadNestedComponents = (root) => {
  const targetComponents = root.querySelectorAll("[data-component]");
  const promises = [...targetComponents].map((element) => {
    const elementPath = element.dataset.component;
    element.removeAttribute("data-component");
    return fetch(elementPath)
      .then((response) => response.text())
      .then((html) => {
        element.insertAdjacentHTML("beforeend", html);
        return loadNestedComponents(element);
      });
  });
  return Promise.all(promises);
};

export default loadComponent;
