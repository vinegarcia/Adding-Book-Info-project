class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    //Add book to list
    addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href= "#" class="delete"> X </td>
    `;

    list.appendChild(row);
};

    showAlert(message, className){
       //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //setTimeout after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

    deleteBook(target){
        if(target.className === 'delete'){
            // console.log('delete');
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//local storage class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        } 

        return books;
    }

static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
        const ui = new UI;

        ui.addBookToList(book);
    });
}

static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            
            }

        });
        localStorage.setItem('books', JSON.stringify(books));
}
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Get Form values
    const title = document.getElementById('title').value, 
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value ;
    
    //instantiate book
    const book = new Book(title, author, isbn);
    
    //instantiate UI
    const ui = new UI();
    
    //validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error' );
    }
    else
    {
    
    //Add book to list
    ui.addBookToList(book);

    //Add to local storage
    Store.addBook(book);
    
    //show success
    ui.showAlert('Book Added', 'success');
    
     
    
    //clear fields
    ui.clearFields();
    
    }
    
    e.preventDefault();

    });
    
    //Event listener
    document.getElementById('book-list').addEventListener('click', function(e){
            //instantiate ui constructor
            const ui = new UI();
            //delete book
            ui.deleteBook(e.target);

            //remove from local storage
            Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
            ui.showAlert('Book Removed', 'success');
    
            // ui.clearFields();
    
            // e.preventDefault();
            
    
    })
