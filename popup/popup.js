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
    const item = document.createElement('li')
    item.textContent = k + ': ' + matches[k]
    list.appendChild(item)
  })
}

requestStatusUpdate()
