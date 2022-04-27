//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)


// Sets h2 to 'books' in local storage is truthy, 'Book Titles' to falsey on page load.
localStorage.getItem('books') === null ? document.querySelector('h2').innerText = 'Book Titles' : document.querySelector('h2').innerText = localStorage.getItem('books')

// document.querySelector('h2').innerText = localStorage.getItem('books') || 'Book Titles';

function getFetch(){
  const choice = 'ISBN:' + document.querySelector('input').value
  const url = `https://openlibrary.org/api/books?bibkeys=${choice}&jscmd=data&format=json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        console.log(data[choice].title)
        // Creates variable with any data held in local storage under the key 'books'
        let books = localStorage.getItem('books')
        // If books has data in it already, reassings books to previous books plus new book title. If not, only adds new book title.
        books ? books = localStorage.getItem('books') + " ; " + data[choice].title : books = data[choice].title
        // Put's new books data into Local Storage
        localStorage.setItem('books', books) 
        // Changes DOM to reflect new inner text in h2
        document.querySelector('h2').innerText = books
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

