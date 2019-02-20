import DOMQuery from './dom-query'
import Listing from './listing'


export default class Filter {
  constructor() {
    this.matches = {}
    this.matchCount = 0
  }


  async run() {
    this.reset()
    await this.getFilters()
      .then(this.processFilters.bind(this), err => console.log(err))
      .then(this.updateState.bind(this))
      
    this.attachTagsToTitles()
  }


  // Reset DOM listing to their default state.
  // Clear the matches object.
  reset() {
    Object.keys(this.matches).forEach(key => {
      this.matches[key].forEach(match => {
        match.classList.remove('untrumped')
      })
    }) 

    this.matchCount = 0
    this.matches = {}
  }


  getFilters() {
    const message = {
      action: 'keywords'
    }

    return browser.runtime.sendMessage(message)
  }


  processFilters(filters) {
    const listings = DOMQuery.getEntries()
    listings.forEach(listing => {
      filters.forEach(filter => {
        this.compare(listing, filter)
      })
    })

    return true
  }


  // Check if listing's title contains 
  // user-defined filter word.
  compare(listing, filter) {
    if (listing.isPromoted()) 
      return
      
    if (!listing.matches(filter.filter))
      return
    
    console.log(`%cRemoved ${listing.titleString}`, "color: red")
    listing.applyFilter(filter)

    this.registerMatch(filter.filter, listing)
  }


  registerMatch(key, listing) {
    this.matchCount++
    if (!this.matches[key]) {
      this.matches[key] = []
    }

    this.matches[key].push(listing)

  }

  
  // Send filter data to background script
  // to update the badge and create a popup menu.
  updateState() {
    const options = {
      action: 'newmatches',
      removed: this.matchCount,
      entries: this.countMatchesByWord()
    }
    
    browser.runtime.sendMessage(options)
      .then(res => console.log(res), 
            err => console.log(err))
  }

  
  attachTagsToTitles() {
    const filters = Object.keys(this.matches)
    filters.forEach(this.attachTag.bind(this))
  }


  attachTag(key) {
    this.matches[key].forEach(listing => {
      if (listing.querySelector('.trumptag'))
        return
        
      const titleElement = listing.querySelector('p.title')
      const flairElement = titleElement.querySelector('.linkflairlabel')

      const span = document.createElement('span')
      span.classList.add('linkflairlabel', 'trumptag')
      span.textContent = key.toUpperCase()
      titleElement.parentNode.insertBefore(span, titleElement)
    })
  }


  // Count how many listings are matched for each filter.
  countMatchesByWord() {
    const o = {}

    Object.keys(this.matches)
      .forEach(key => {
        o[key] = this.matches[key].length
      })

    return o
  }


  toggle(word) {
    this.matches[word]
      .forEach(el => {
        el.toggle()
      })
  }
}
