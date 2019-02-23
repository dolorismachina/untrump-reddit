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
    {
      filter: 'trump',
      autohide: false,
      emphasize: false
    },
    {
      filter: 'amazon',
      autohide: false,
      emphasize: false
    },
    {
      filter: 'facebook',
      autohide: false,
      emphasize: false
    }  
  ]

  browser.storage.local.set({keywords: filters})  
})


function onMessage(message, sender, respond) {
  if (!message.action) {
    console.error('Received message with no action. I don\' know what to do with it')
    console.log(message)
    return
  }

  switch(message.action) {
    case 'status':
      handleStatusUpdate(message, sender, respond)
      break
    case 'newmatches':
      handleNewMatches(message, sender, respond)
      break
    case 'keywords':
      return handleKeywords()
      break
    case 'popup-new-filter':
      return handlePopupNewFilter(message.content)
      break
  }
}

async function handlePopupNewFilter(content) {
  const filters = await browser.storage.local.get('keywords')
  if (filters.keywords.includes(content))
    return

  filters.keywords.push(content)

  await browser.storage.local.set({
    keywords: filters.keywords
  })

  await refreshFrontend()

  return matches
}


async function refreshFrontend() {
  const tabs = await browser.tabs.query({
    url: ["*://*.reddit.com/*"]
  })

  const promises = []
  tabs.forEach(tab => {
    const promise = browser.tabs.sendMessage(tab.id, {
      action: 'refresh'
    })
    promises.push(promise)
  })

  return Promise.all(promises)
}

function handleStatusUpdate(message, sender, respond) {
  respond({
    matches: matches
  })
}


function handleNewMatches(message, sender, respond) {
  matches = message.entries
  updateBadgeText(message.removed)

  browser.runtime.sendMessage({
    action: 'new-matches-registered'
  })
}


function updateBadgeText(entriesRemoved) {
  browser.browserAction.setBadgeText({text: entriesRemoved.toString()})
}
