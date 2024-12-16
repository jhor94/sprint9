import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { BookService } from '../../../services/books/book.service';
import { Book } from '../../../interfaces/book';
import { WhislistService } from '../../../services/wishlist/whislist.service';
import { wishBook } from '../../../interfaces/wishBook';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  serviceBookUser = inject(BookService)
  wishListBookUser = inject(WhislistService)
  listaUserBook: Book[] = []
  listaWishUser: wishBook[] = []
  user:any = null;
  userString: string | null =null  ;


  ngOnInit(): void {
    this.userString = localStorage.getItem('user')
    if (this.userString) {
      this.user = JSON.parse(this.userString);
    } else {
      console.error('User not found in localStorage');
    }
   this.getBookListUser()
   this.getWishListUser()

  }

  constructor(/*private toastr: ToastrService*/) { }

  getBookListUser() {
    if(this.userString){
      const parsedUser = JSON.parse(this.userString)
      console.log(parsedUser)
      const user_id = parsedUser.id_user
      console.log(user_id)

      this.serviceBookUser.getBooksbyUser(user_id).subscribe((response: Book[]) => {
        this.listaUserBook = response
        console.log(this.listaUserBook, "lista de libros del usuario")
      })
      
    }else{
      console.log("no hay usuario asociados")
    }
  }

  getWishListUser(){
    if(this.userString){
      const parsedUser = JSON.parse(this.userString)
      console.log(parsedUser)
      const user_id = parsedUser.id_user
      console.log(user_id)

      this.wishListBookUser.getWishlistbyUser(user_id).subscribe((response: Book[]) => {
        this.listaWishUser = response
        console.log(this.listaWishUser, "lista de libros del usuario")
      })
      
    }else{
      console.log("no hay usuario asociados")
    }
  }

  borrarLibro(id_book: number) {
    if (confirm(`Estas seguro que quieres borrar este usuario?`)) {

      this.serviceBookUser.deleteBook(id_book).subscribe(() => {
        this.getBookListUser();
       // this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
      })
    } else {
      console.log('La persona no fue eliminada', 'Persona no eliminada')
    }

  }

  borrarLibroWish(id_bookWish: number) {
    if (confirm(`Estas seguro que quieres borrar este usuario?`)) {

      this.wishListBookUser.deleteBookWish(id_bookWish).subscribe(() => {
        this.getWishListUser();
       // this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
      })
    } else {
      console.log('La persona no fue eliminada', 'Persona no eliminada')
    }

  }
}
