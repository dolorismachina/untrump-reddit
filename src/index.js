import Filter from './filter'

(function() {
  const f = new Filter()

  f.run()


  browser.runtime.onMessage.addListener(message => {
    switch (message.action) {
      case 'toggle':
        f.toggle(message.keyword)
        break
      
      case 'refresh':
        f.run()
        break
    }
  })
})()