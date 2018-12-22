var divs = document.querySelectorAll('.thing')
divs.forEach(e => {
  let link = e.querySelector('a.title').textContent
  if (link.includes('Asia')) {
    e.parentNode.removeChild(e)
  }
})
/*
Exception: TypeError: link.contains is not a function
@Scratchpad/1:4:15
@Scratchpad/1:2:1
*/