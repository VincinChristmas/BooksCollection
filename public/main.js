const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')



update.addEventListener('click', _ => {
    fetch('/books', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: 'Napoleon Hill',
            book: 'Think And Grow Rich',
          }),
      })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
  })

  deleteButton.addEventListener('click', _ => {
    fetch('/books', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      author: 'Napoleon Hill'
    })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No books to delete') {
          messageDiv.textContent = 'you deleted all the books'
        } else {
          window.location.reload(true)
        }
    })
    .catch(console.error)
  })