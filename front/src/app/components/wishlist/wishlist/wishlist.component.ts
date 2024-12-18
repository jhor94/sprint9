import { Component, inject, OnInit } from '@angular/core';

import { BookService } from '../../../services/books/book.service';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  listBookUser = inject(BookService)
  listaWishUser: any[] = []
  userString: string | null = null
  user:any = null;

  ngOnInit(): void {
    this.userString = localStorage.getItem('user')
    if (this.userString) {
      this.user = JSON.parse(this.userString);
    } else {
      console.error('User not found in localStorage');
    }
    this.getWishListUser()
  }

  getWishListUser(){
    if(this.userString){
      const parsedUser = JSON.parse(this.userString)
      console.log(parsedUser)
      const user_id = parsedUser.id_user
      const action = "wish"
      console.log(user_id)

      this.listBookUser.getBooksbyUser(user_id, action).subscribe((response: any[]) => {
        console.log(response)
        this.listaWishUser = response.map(bookUser => {
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
  
        console.log(this.listaWishUser, "lista de libros del usuario")
      })
      
    }else{
      console.log("no hay usuario asociados")
    }
    }

    borrarLibroWish(book_id: number) {
      if (confirm(`Estas seguro que quieres borrar este usuario?`)) {
      if(this.userString){
        const parsedUser = JSON.parse(this.userString)
        console.log(parsedUser)
        const user_id = parsedUser.id_user
        console.log(user_id)
        this.listBookUser.deleteBook(book_id, user_id).subscribe(() => {
          this.getWishListUser();
         // this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
        })
      }
      } else {
        console.log('El libro no fue eliminado', 'Persona no eliminada')
      }
  
    }
}
