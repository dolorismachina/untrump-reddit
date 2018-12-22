const keywords = [
  'facebook',
  'trump',
  'mueller',
  'verizon',
  'windows',
  'google',
  'amazon'
]

let entriesMatched = 0
const matches = {}
keywords.forEach(word => {
  matches[word] = []
})

const entries = getEntries()
entries.forEach(entry => {
  match(entry)
})

browser.runtime.sendMessage({
  removed: entriesMatched
})

function getEntries() {
  return document.querySelectorAll('.thing')
}

function getEntryTitle(entry) {
  return entry.querySelector('a.title').textContent
}

// Subreddit the entry is from
function getEntryOrigin(entry) {
  return entry.querySelector('a.subreddit').textContent
}

function match(entry) {
  if (isPromoted(entry)) return

  keywords.forEach(word => {
    filter(entry, word)
  })
}

function isPromoted(entry) {
  return entry.classList.contains('promoted')
}

function filter(entry, keyword) {
  const title = getEntryTitle(entry).toLowerCase()

  if (title.includes(keyword.toLowerCase())) {
    // entry.parentNote.removeChild(entry)
     entry.style.border = '1px solid red'
     entry.style.opacity = '0.25'
     entry.style.display = 'none'
     console.log(`%cRemoved ${title}`, "color: red")
     entriesMatched++

     matches[keyword].push(entry)
   }
}

console.log(matches)