const getById = (id) => document.getElementById(id);
const getByClass = (className) => document.getElementsByClassName(className);
const getByTag = (tagName) => document.getElementsByTagName(tagName);
const querySelector = (selector) => document.querySelector(selector);

export { getById, getByClass, getByTag, querySelector };
