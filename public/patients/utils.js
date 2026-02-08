/**
 * Updates the DOM with new elements.
 * @param {String} value - The value to add to the new element.
 */
function updateDOM(value = null, parentElement = null, cb = null) {
  if (value && parentElement) {
    const ele = document.createElement("h1");
    ele.textContent = value;

    parentElement.innerHTML = "";
    parentElement.appendChild(ele);
  }

  if (cb) cb();
}

/**
 * Hides elements on the DOM by assigning style = "none"
 * @param  {...any} elements - Takes multiple elements.
 */
const hideDOMElements = (...elements) => elements.forEach((ele) => (ele.style.display = "none"));

export { updateDOM, hideDOMElements };
