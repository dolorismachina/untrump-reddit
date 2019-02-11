const defaultKeywords = [
  'facebook',
  'trump',
  'mueller',
  'verizon',
  'windows',
  'google',
  'amazon'
]

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


// Init extension with a few default words
browser.runtime.onInstalled.addListener(details => {
  const filters = [
    'trump',
    'facebook',
    'google',
  ]

  browser.storage.local.set({keywords: filters})  
})


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
