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
      action: 'own'
    };
    console.log('Datos enviados al backend:', bookData);
    console.log("contenido de la BookListSearch", this.BookListSearch)

    const isBookInList = this.BookListSearch.some(b => 
      b.external_id_api === book.external_id_api && b.user_id === bookData.user_id && b.action === bookData.action);
    if (isBookInList) {
      alert('Este libro ya está en tu lista.');
      return;
    }

    this.bookServicio.addBook(bookData).subscribe({
      next: (response: any) => {
        console.log(response, "libro agregado")
        this.BookListSearch.push(book)
        alert("Agregado con exito")
      },
      error: (err) => {
        console.error(err, "error al agregar")
        if (err.status === 400 && err.error.code === -101) {
          alert("Libro duplicado");  // Mostrar mensaje de error del backend
        } else {
          console.error('Error al agregar el libro:', err);
          alert('Ha ocurrido un error al agregar el libro.');
        }
      }
    })
    console.log(this.BookListSearch)
    console.log("librocreado")
  }

  addWishBookList(book: Book) {
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
    console.log(this.BookListSearch, "lista actual")

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
      action: 'wish'
    };
    console.log('Datos enviados al backend:', bookData);
    const isBookInList = this.BookListSearch.some(b => 
      b.external_id_api === book.external_id_api && b.user_id === bookData.user_id && b.action === bookData.action);
    if (isBookInList) {
      alert('Este libro ya está en tu lista.');
      return;
    }

    this.bookServicio.addBook(bookData).subscribe({
      next: (response: any) => {
        console.log(response, "libro agregado")
        this.BookListSearch.push(book)
        alert("Agregado con exito")
      },
      error: (err) => {
        console.error(err, "error al agregar")
        if (err.status === 400 && err.error.code === -101) {
          alert("Libro duplicado");  // Mostrar mensaje de error del backend
        } else {
          console.error('Error al agregar el libro:', err);
          alert('Ha ocurrido un error al agregar el libro.');
        }
      }
    })
    console.log(this.BookListSearch)
    console.log("librocreado")
  }
}




