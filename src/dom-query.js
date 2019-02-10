export default {
  getEntries() {
    return document.querySelectorAll('.thing')
  },

  getEntryTitle(entry) {
    return entry.querySelector('a.title').textContent
  },

  // Subreddit the entry is from
  getEntryOrigin(entry) {
    return entry.querySelector('a.subreddit').textContent
  }
}