export type HTMLFormNamedItem = (Element & { value?: string }) | RadioNodeList;

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection
export interface HTMLFormControlsCollection {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection/namedItem
  namedItem(name: string): null | HTMLFormNamedItem;
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
export interface HTMLFormElement {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
  elements: HTMLFormControlsCollection;
}
