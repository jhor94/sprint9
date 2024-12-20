import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink,  } from '@angular/router';
import { AuthService } from '../../../services/authservice/auth.service';
import { BookService } from '../../../services/books/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private accesoService = inject(AuthService)
  servicioBook = inject(BookService)
  private router = inject(Router)
  searchQuery:string =""
  searchForm: FormGroup

  showList: boolean = false;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
      this.searchForm = this.fb.group({
        searchQuery: ['']
      })
    }

  isLoggedIn():boolean{
    return this.accesoService.IsLogin();
  }

  logOut(){
    this.accesoService.removeLogin();
    this.router.navigate([''])
  }


  }

