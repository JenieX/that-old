export function sleep(milliSeconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliSeconds);
  });
}

export function saveFile(blobURL, fileName) {
  return new Promise((resolve) => {
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = fileName;
    link.dispatchEvent(new MouseEvent('click'));
    window.setTimeout(() => window.URL.revokeObjectURL(blobURL), 1000);
    resolve();
  });
}

export function addStyle(css, parent = document.documentElement) {
  if (GM.addElement) {
    return GM.addElement(parent, 'style', { textContent: css });
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = css;
  parent.appendChild(style);
  return style;
}

export function addElement([
  tagName,
  attributes,
  parent = document.documentElement,
]) {
  if (GM.addElement) {
    return GM.addElement(parent, tagName, attributes);
  }

  const element = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  parent.appendChild(element);
  return element;
}

export function addElements(...items) {
  const elements = [];
  for (const item of items) {
    elements.push(addElement(item));
  }
  return elements;
}
