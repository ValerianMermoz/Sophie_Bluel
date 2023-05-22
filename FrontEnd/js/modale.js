const openModal = function(e) {
    e.preventDefault()
    const modalOpen = document.querySelector(e.EventTarget.getAttribute('href'))
    modalOpen.style.display = 'flex'
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})