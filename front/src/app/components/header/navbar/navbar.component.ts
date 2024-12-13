import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink,  } from '@angular/router';
import { AuthService } from '../../../services/authservice/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private accesoService = inject(AuthService)
  private router = inject(Router)
  mensajeParaHija:string = 'mensaje a hija'

  showList: boolean = false;
  
  showshipsList(){
    this.showList = !this.showList;
  }

  isLoggedIn():boolean{
    return this.accesoService.IsLogin();
  }

  logOut(){
    this.accesoService.removeLogin();
    this.router.navigate([''])
  }
}
