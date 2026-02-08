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

const enableCallButton = (element, classname) => (element.className = classname);
const disableCallButton = (element, classname) => (element.className = classname);

export { updateDOM, enableCallButton, disableCallButton };
