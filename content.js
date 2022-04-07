window.addEventListener('mouseup', function () {
  const selectedText = this.window.getSelection().toString()
  const isTranslatable = checkIsTranslatable(selectedText)

  if (!isTranslatable) {
    console.log('minimal 2 karakter!')
    return
  }

  showTranslatedText(selectedText)
})

function removeBubble () {
  document.getElementsByClassName('bubble')[0].remove()
}

this.document.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    removeBubble()
  }
})

this.document.addEventListener('dblclick', function () {
  removeBubble()
})

function checkIsTranslatable (text) {
  if (text.length < 2) {
    return false
  }
  
  return true
}

async function getTranslatedText (text) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
      'X-RapidAPI-Key': 'ddcfc8cb92msh283de8c06662fa2p1e3852jsn9b9d2b8f37e8'
    },
    body: `[{"Text":"${text}"}]`
  };
  
  let response = await fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to=id&api-version=3.0&from=en&profanityAction=NoAction&textType=plain', options)

  response = await response.json()
  return response[0].translations[0].text
}

function showTranslatedText (text) {
  if (isBubbleExist()) {
    const bubble = document.getElementsByClassName('bubble')[0]
    bubble.innerText = "loading..."
    changeBubbleText(bubble, text)
    return
  }
  
  const bubble = document.createElement('div')
  bubble.classList.add('bubble')
  bubble.innerText = "loading..."
  changeBubbleText(bubble, text)

  document.getElementsByTagName('body')[0].appendChild(bubble)
}

function isBubbleExist () {
  const bubbles = document.getElementsByClassName('bubble')
  if (bubbles.length == 0) {
    return false
  }

  return true
}

async function changeBubbleText (el, text) {
  const translatedText = await getTranslatedText(text)

  el.innerText = translatedText
}