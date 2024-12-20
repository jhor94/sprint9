import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { BookService } from '../../../services/books/book.service';
import { Book } from '../../../interfaces/book';
import { BooklistComponent } from "../../booklist/booklist/booklist.component";
import { WishlistComponent } from "../../wishlist/wishlist/wishlist.component";
import { WelcomeComponent } from '../../welcomeprofile/welcome/welcome.component';
import { ListFriendsComponent } from "../../welcomeprofile/friends/list-friends/list-friends.component";
import { SettingsUserComponent } from "../../welcomeprofile/settings-profile/settings-user/settings-user.component";



@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, BooklistComponent, WishlistComponent, WelcomeComponent, ListFriendsComponent, SettingsUserComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  
  user:any = null;
  userString: string | null =null
  activeTab: string = 'inicio';
  isSidebarHidden: boolean = true
  


  ngOnInit(): void {
    this.userString = localStorage.getItem('user')
    if (this.userString) {
      this.user = JSON.parse(this.userString);
    } else {
      console.error('User not found in localStorage');
    }

  }

  tabs = [
    { id: 'inicio', title: 'Inicio' },
    { id: 'libros', title: 'Mis Libros' },
    { id: 'deseos', title: 'Lista de Deseos' },
    { id: 'perfil', title: 'Mi Perfil' },
    { id: 'configuracion', title: 'Configuración' }
  ];

  // Cambiar el tab activo
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  constructor(/*private toastr: ToastrService*/) { }


}
