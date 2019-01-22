(function() {

  const textArea = document.querySelector('textarea')
  const button = document.querySelector('button')
  button.addEventListener('click', saveToStorage)
  
  
  getFromStorage()
  
  
  function saveToStorage(e) {
    const words = processInput()
  
    browser.storage.local.set({
      keywords: words
    })
    .then(res => {
      console.log('Saved to storage')

      browser.tabs.query({
        url: ["*://*.reddit.com/*"]
      }).then(tabs => {
        console.log(tabs)
        tabs.forEach(tab => {
          browser.tabs.sendMessage(tab.id, {
            action: "refresh",
          }).then(res => console.log(res), err => console.error(err))
        })
      })
    },
          err => console.error(err))
  }
  
  
  async function getFromStorage() {
    const words = await browser.storage.local.get('keywords')
    textArea.value = ''
    words.keywords.forEach(w => textArea.value += w + '\n')
  }
  
  
  function processInput() {
    const wordArray = textArea.value.split('\n')
    const wordArrayTrimmed = wordArray.map(w => w.trim())
    const arrayFiltered = wordArrayTrimmed.filter(w => w.length > 0)
  
    return arrayFiltered
  }
  
})()
