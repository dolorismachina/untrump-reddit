function requestStatusUpdate() {
  const options = {
    action: 'status'
  }
  browser.runtime.sendMessage(options)
  .then(update)
}

function update(data) {
  console.log('popup')
  console.log(data)
  createList(data.matches)
}

// Populate UL with list of keywords 
// and number of matched listings.
function createList(matches) {
  const list = document.querySelector('ul')

  Object.keys(matches).forEach(k => {
    const item = createListItem({key: k, matches: matches[k]})
    list.appendChild(item)
  })
}

function createListItem(data) {
  console.log(data)
  const item = document.createElement('li')
  item.textContent = data.key + ': ' + data.matches

  item.addEventListener('click', e => {
    onClickListItem(data.key)
  })

  return item
}

let key = ''
function onClickListItem(k) {
  key = k
  browser.tabs.query({
    active: true,
    url: ["*://*.reddit.com/*"]
  }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      action: "toggle",
      keyword: key
    })
  })
}

requestStatusUpdate()
