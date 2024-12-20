import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/books/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  title = 'front';
  bookServicio = inject(BookService)
  BookListSearch: any[] = []
  OwnListSearch: any[] = []
  top3BooksOwn:any[]=[]
  searchForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    })
  }

  ngOnInit(): void {
    this.searchBooks()
    this.getOwnTop()
  }

  searchBooks() {
    const searchQuery = this.searchForm.get('searchQuery')?.value
    console.log("buscando libros de", searchQuery)
    if (searchQuery) {

      this.BookListSearch = []
      console.log(this.BookListSearch)
      this.bookServicio.searchBooks(searchQuery).subscribe({
        next: (response: any) => {
          console.log(response)
          this.BookListSearch = response.data
          console.log(this.BookListSearch)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }

  getOwnTop() {
    this.bookServicio.getOwnTop().subscribe((response: any[]) => {
      console.log(response)
      this.OwnListSearch = response.map(bookUser => {
        const book = bookUser.Book || {}
        return {
          book_id: book.id_book,
          external_id_api: book.external_id_api,
          title: book.title,
          author: book.author,
          publishers: book.publishers,
          isbn: book.isbn,
          cover: book.cover,
        }
      })
      console.log(this.OwnListSearch, "lista de libros del OWN")
      this.top3BooksOwn = this.OwnListSearch.slice(0,3)
      console.log(this.top3BooksOwn, "top 3 libros del OWN")
    })
  }
}