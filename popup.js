const TOGGLER = document.getElementById('toggler')
const STATUS = document.getElementById('status')

let isChecked = false

TOGGLER.addEventListener('click', function () {
  isChecked = !isChecked

  if (isChecked) {
    STATUS.classList.add('active')
    STATUS.innerText = "Hidup"
    return
  }

  STATUS.classList.remove('active')
  STATUS.innerText = "Mati"
})