import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/books/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-result-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './result-books.component.html',
  styleUrl: './result-books.component.scss'
})
export class ResultBooksComponent {

  bookServicio = inject(BookService)
  BookListSearch: Book[] = []
  searchForm: FormGroup
  imgUrl: string = ''
  book: Book[] = []

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    })
  }

  ngOnInit(): void {
    this.searchBooks()
  }

  searchBooks() {
    const searchQuery = this.searchForm.get('searchQuery')?.value
    console.log("buscando libros de", searchQuery)
    if (searchQuery) {

      this.BookListSearch = []
      console.log(this.BookListSearch)
      this.bookServicio.searchtBooks(searchQuery).subscribe({
        next: (response: any) => {
          console.log(response)
          this.BookListSearch = response.data.map((book: Book) => {
            return {
              ...book,
              subject: book.subject,
              cover: book.cover = `https://covers.openlibrary.org/b/olid/${book.cover}-L.jpg`
            }
          });
          console.log(this.BookListSearch)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }




  addBookList(book: Book) {
    console.log(book)
    const user = localStorage.getItem('user');
    console.log(user)
    if(!user){
      alert('Debes estar logueado para agregar libros a tu lista')
      return
    }

    const parsedUser = JSON.parse(user)
    console.log(parsedUser)
    const user_id = parsedUser.id_user

    const bookData = {
      external_id_api: book.external_id_api,
      user_id: Number(user_id),
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      number_of_pages: book.number_of_pages,
      cover: book.cover,
      publishers: book.publishers,
      subject: book.subject,
    };
    console.log('Datos enviados al backend:', bookData);

    this.bookServicio.addBook(bookData).subscribe({
      next: (response: any) => {
        console.log(response, "libro agregado")
        this.BookListSearch.push(book)
      },
      error: (err) => {
        console.error(err, "error al agregar")
      }
    })
    console.log(this.BookListSearch)
    console.log("librocreado")
  }
}




