const TOGGLER = document.getElementById('toggler')
const STATUS = document.getElementById('status')

function setToggleActive () {
  STATUS.classList.add('active')
  STATUS.innerText = "Hidup"
  TOGGLER.classList.add('active')
}

var isChecked
chrome.storage.sync.get(['isActive'], async function(result) {
  isChecked = await result.isActive
  if (isChecked) setToggleActive()
});

TOGGLER.addEventListener('click', function () {
  isChecked = !isChecked
  chrome.storage.sync.set({"isActive": isChecked}, function() {
  });
  if (isChecked) {
    setToggleActive()
    return
  }

  TOGGLER.classList.remove('active')
  STATUS.classList.remove('active')
  STATUS.innerText = "Mati"
})