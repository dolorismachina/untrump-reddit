document.querySelector('button').addEventListener('click', e => {
  browser.runtime.openOptionsPage()
})


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
  const left = document.createElement('div')
  const right = document.createElement('div')

  item.classList.add('popup-list-item')
  left.textContent = data.key
  right.textContent = data.matches

  item.appendChild(left)
  item.appendChild(right)
  
  item.addEventListener('click', e => {
    item.classList.toggle('disabled')
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
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        action: "toggle",
        keyword: key
      })
    })
    
  })
}

requestStatusUpdate()
