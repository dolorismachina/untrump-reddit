browser.runtime.onMessage.addListener(message => {
  console.log(message)
  updateBadgeText(message.removed)
})

function updateBadgeText(entriesRemoved) {
  console.log('w')
  browser.browserAction.setBadgeText({text: entriesRemoved.toString()})
}