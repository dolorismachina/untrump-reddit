const textArea = document.querySelector('textarea')
const wordArray = textArea.value.split('\n')
const wordArrayTrimmed = wordArray.map(w => w.trim())
const arrayFiltered = wordArrayTrimmed.filter(w => w.length > 0)

const button = document.querySelector('button')
button.addEventListener('click', e => {
  browser.storage.local.set({
    keywords: arrayFiltered
  })
  .then(res => console.log(res),
        err => console.error(err))
})

browser.storage.local.get('keywords')
.then(res => {
    console.log(res)
    textArea.value = ''
    res.keywords.forEach(w => textArea.value += w + '\n')
  },
      err => console.error(err))
