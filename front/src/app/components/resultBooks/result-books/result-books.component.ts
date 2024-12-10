import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/books/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './result-books.component.html',
  styleUrl: './result-books.component.scss'
})
export class ResultBooksComponent {

  bookServicio = inject(BookService)
  BookListSearch: any [] = []
  searchForm: FormGroup

  constructor(private fb:FormBuilder){
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
    if(searchQuery){

      this.BookListSearch = []
      console.log(this.BookListSearch)
      this.bookServicio.searchtBooks(searchQuery).subscribe({
        next:(response: any) => {
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

  
}

