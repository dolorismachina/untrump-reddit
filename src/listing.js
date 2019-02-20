/*
  - hide
  - emphasize
  - filter out
  - toggle
  - cover with black rectangle
*/

export default class Listing {
  constructor(element) {
    this.element = element
    this.titleElement = element.querySelector('a.title')
    this.titleString = this.titleElement.textContent
  }

  matches(str) {
    return this.titleString.toLowerCase().includes(str.toLowerCase())
  }

  isPromoted() {
    return this.element.classList.contains('promoted')
  }

  applyFilter(filter) {
    console.log('Apply filter')
    console.log(filter)

    if (filter.autohide) {
      this.element.classList.add('untrumped-hidden')
      
      return
    }

    if (filter.emphasize) {
      this.element.classList.add('untrumped-emphasized')

      return
    }

    this.element.classList.add('untrumped')
  }

  hide() {
    const hide = this.element.querySelector('a[data-event-action=hide]')
    hide.click()
  }

  toggle() {
    this.element.classList.toggle('untrumped')
  }
}
