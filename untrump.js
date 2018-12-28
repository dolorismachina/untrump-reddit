(function() {
  console.clear()

  const keywords = [
    'facebook',
    'trump',
    'mueller',
    'verizon',
    'windows',
    'google',
    'amazon'
  ]

  let entriesMatched = 0 // Entries matching keywords.

  const matchData = {
    entriesMatched: 0,
    matches: {}
  }

  function prepareMatchArray() {
    keywords.forEach(word => {
      matchData.matches[word] = []
    })
  }

  function findMatches() {
    const entries = getEntries()
    entries.forEach(entry => {
      match(entry)
    })
  }

  function updateBadge() {
    // Update browser_action with number of matches.
    browser.runtime.sendMessage({
      removed: entriesMatched,
      entries: getMatchCount(matchData.matches)
    })
  }

  function getMatchCount(matches) {
    const o = {}
    Object.keys(matches).forEach(key => {
      o[key] = matches[key].length
    })

    return o
  }

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
      entry.classList.add('untrumped')
      console.log(`%cRemoved ${title}`, "color: red")
      entriesMatched++

      matchData.matches[keyword].push(entry)
    }
  }

  function handleToggle(keyword) {
    matchData.matches[keyword].forEach(el => {
      el.classList.toggle('untrumped')
    })
  }

  browser.runtime.onMessage.addListener(message => {
    switch (message.action) {
      case 'toggle':
        handleToggle(message.keyword)
    }
  })

  prepareMatchArray()
  findMatches()
  updateBadge()

  console.log(matchData.matches)
})()