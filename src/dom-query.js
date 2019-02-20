import Listing from './listing'

export default {
  getEntries() {
    const entries = document.querySelectorAll('.thing')
    const arr = []
    entries.forEach(e => {
      arr.push(new Listing(e))
    })

    return arr
  },

  getEntryTitle(entry) {
    return entry.querySelector('a.title').textContent
  },

  // Subreddit the entry is from
  getEntryOrigin(entry) {
    return entry.querySelector('a.subreddit').textContent
  }
}