import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/books/book.service';
import { Book } from '../../../interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booklist',
  imports: [CommonModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss'
})
export class BooklistComponent  implements OnInit {
  serviceBookUser = inject(BookService)
  listaUserBook: any[] = []
  userString: string | null = null
  user:any = null;

  isVisible = false

  constructor(private route: Router){}
ngOnInit(): void {
  this.userString = localStorage.getItem('user')
  if (this.userString) {
    this.user = JSON.parse(this.userString);
  } else {
    console.error('User not found in localStorage');
  }
  this.getBookListUser()
}


closeModal() {
  // Al cerrar, se remueve el modal sin cambiar la URL
  this.route.navigate([{ outlets: { modal: null } }]);
}

getBookListUser() {
    if(this.userString){
      const parsedUser = JSON.parse(this.userString)
      console.log(parsedUser)
      const user_id = parsedUser.id_user
      const action = "own"
      console.log(user_id)

      this.serviceBookUser.getBooksbyUser(user_id, action).subscribe((response: any[]) => {
        console.log(response)
        this.listaUserBook = response.map(bookUser => {
          const book = bookUser.Book || {}
          return {
            book_id: book.id_book,
            external_id_api:book.external_id_api,
            title: book.title,
            author: book.author,
            publishers:book.publishers,
            isbn:book.isbn,
            cover:book.cover,
          };
        });
  
        console.log(this.listaUserBook, "lista de libros del usuario")
      })
      
    }else{
      console.log("no hay usuario asociados")
    }
  }

  borrarLibro(book_id: number) {
    if (confirm(`Estas seguro que quieres borrar este usuario?`)) {
      if(this.userString){
        const parsedUser = JSON.parse(this.userString)
        console.log(parsedUser)
        const user_id = parsedUser.id_user
        console.log(user_id)
        this.serviceBookUser.deleteBook(book_id, user_id).subscribe(() => {
          this.getBookListUser();
         // this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
        })
      }
      } else {
        console.log('El libro no fue eliminado', 'Persona no eliminada')
      }


}
}
