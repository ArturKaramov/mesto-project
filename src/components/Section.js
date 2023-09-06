export default class Section {
  constructor({renderer}, selector) {
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item)
    })
  }

  addItem(item) {
    this.container.prepend(item)
  }

  appendItem(item) {
    this.container.append(item)
  }
}

