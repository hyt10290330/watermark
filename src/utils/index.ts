export function getElement(el: String | Element): Element | null {
  if (typeof el === 'string') {
    return document.querySelector(el)
  } else {
    return el as Element
  }
}
