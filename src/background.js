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
  if (!message.action) {
    console.error('Received message with no action. I don\' know what to do with it')
    console.log(message)
    return
  }

  if (message.action === 'status') {
    handleStatusUpdate(message, sender, respond)
  }
  else if (message.action === 'newmatches') {
    console.log('s', message)
    handleNewMatches(message, sender, respond)
  }
  else if (message.action === 'keywords') {
    return handleKeywords()
  }
  else if (message.action === 'popup-new-filter') {
    handlePopupNewFilter(message.content)
  }
}

function handlePopupNewFilter(content) {
  browser.storage.local.get('keywords')
  .then(res => {
    if (res.keywords.includes(content))
      return

    res.keywords.push(content)

    browser.storage.local.set({
      keywords: res.keywords
    })
    .then(res => console.log('Storage updated'), err => console.error(err))
  })
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
