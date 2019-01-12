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
    .then(onSaveToStorage, onSaveToStorageError)
  }
  

  function onSaveToStorage(response) {
    console.log('Words saved to storage.')
  }


  function onSaveToStorageError(error) {
    console.error(error)
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
