
let matches = {}
browser.runtime.onMessage.addListener(onMessage)

function onMessage(message, sender, respond) {
  if (message.action && message.action === 'status') {
    handleStatusUpdate(message, sender, respond)
  }
  else if (message.action && message.action === 'newmatches') {
    console.log('s', message)
    handleNewMatches(message, sender, respond)
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
