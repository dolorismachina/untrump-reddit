const defaultKeywords = [
  'facebook',
  'trump',
  'mueller',
  'verizon',
  'windows',
  'google',
  'amazon'
]

// Populate storage with mock words.
// Remove before publishing.
browser.storage.local.set({
  keywords: [
    'trump', 
    'facebook'
  ]})

let matches = {}
browser.runtime.onMessage.addListener(onMessage)

function handleKeywords() {
  return queryStorage()
    .then(processQuery)
}

function processQuery(result) {
  if (result.keywords) {
    return result.keywords
  }
  else {
    return defaultKeywords
  }
}

function queryStorage() {
  return browser.storage.local.get('keywords')
}

function onMessage(message, sender, respond) {
  if (message.action && message.action === 'status') {
    handleStatusUpdate(message, sender, respond)
  }
  else if (message.action && message.action === 'newmatches') {
    console.log('s', message)
    handleNewMatches(message, sender, respond)
  }
  else if (message.action && message.action === 'keywords') {
    return handleKeywords()
  }
}

function handleStatusUpdate(message, sender, respond) {
  respond({
    matches: matches
  })
}

function handleNewMatches(message, sender, respond) {
  matches = message.entries
  updateBadgeText(message.removed)
}

function updateBadgeText(entriesRemoved) {
  browser.browserAction.setBadgeText({text: entriesRemoved.toString()})
}
