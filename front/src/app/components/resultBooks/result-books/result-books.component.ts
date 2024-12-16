import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/books/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { WhislistService } from '../../../services/wishlist/whislist.service';
import { wishBook } from '../../../interfaces/wishBook';

@Component({
  selector: 'app-result-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './result-books.component.html',
  styleUrl: './result-books.component.scss'
})
export class ResultBooksComponent {

  bookServicio = inject(BookService)
  wishBookServicio = inject(WhislistService)
  BookListSearch: Book[] = []
  BookWishListSearch: wishBook[] = []
  searchForm: FormGroup
  imgUrl: string = ''
  book: Book[] = []

  currentnumberPage = 1
  allBooksLoad = false

  readonly maxPages = 4

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    })
  }

  ngOnInit(): void {
    this.searchBooks()
  }

  searchBooks(loadMore: boolean = false) {

    const searchQuery = this.searchForm.get('searchQuery')?.value
    console.log("buscando libros de", searchQuery)

    if(!searchQuery){
      console.log("Termino de busqueda vacio")
    }

    if(!loadMore){
      this.currentnumberPage = 1
      this.BookListSearch = []
      this.allBooksLoad = false
    }
      this.bookServicio.searchBooks(searchQuery, this.currentnumberPage).subscribe({
        next: (response: any) => {
          console.log(response)
          if(response && Array.isArray(response)){
            const newBooks = response.map((book: Book) => ({
              ...book,
              subject: book.subject,
              cover: book.cover = `https://covers.openlibrary.org/b/olid/${book.cover}-L.jpg`
          }))
          if(newBooks.length === 0){
            this.allBooksLoad = true
          }else {
            this.BookListSearch = [...this.BookListSearch, ...newBooks];
            this.currentnumberPage++
          }
          }else{
            console.log("no se encontraron datod validos", response)
            console.log(this.BookListSearch)
          }
        },
        error:(err)=>{
          console.log(err, "error al cargar libros")
        }
      })
  }

  loadMoreBooks(){
    if(this.currentnumberPage < this.maxPages){
      this.currentnumberPage++
      this.searchBooks()
      console.log(this.currentnumberPage)
      }else {
        this.allBooksLoad = true
        console.log("se cargaron toda la busqueda")
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

  addWishBookList(wishbook: wishBook) {
    console.log(wishbook)
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
      external_id_api: wishbook.external_id_api,
      user_id: Number(user_id),
      title: wishbook.title,
      author: wishbook.author,
      isbn: wishbook.isbn,
      number_of_pages: wishbook.number_of_pages,
      cover: wishbook.cover,
      publishers: wishbook.publishers,
      subject: wishbook.subject,
    };
    console.log('Datos enviados al backend:', bookData);

    this.wishBookServicio.addWishBook(bookData).subscribe({
      next: (response: any) => {
        console.log(response, "libro agregado")
        this.BookWishListSearch.push(wishbook)
      },
      error: (err) => {
        console.error(err, "error al agregar")
      }
    })
    console.log(this.BookWishListSearch)
    console.log("librocreado")
  }
}




