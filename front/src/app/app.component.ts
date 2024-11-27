import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './services/books/book.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'front';
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
