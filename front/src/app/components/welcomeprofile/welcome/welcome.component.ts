import { Component, Input, OnInit } from '@angular/core';
import { UserprofileComponent } from '../../userprofile/userprofile/userprofile.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BooklistComponent } from "../../booklist/booklist/booklist.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  // Propiedades que simulan los datos de un usuario
  userString: string | null =null
  userName: any = null
  friendsList: string[] = ['Amigo 1', 'Amigo 2', 'Amigo 3'];
  wishlistBooks: string[] = ['Libro 1', 'Libro 2', 'Libro 3'];
  exchangeSummary: string = 'Has intercambiado 5 libros hasta la fecha';
  showModal: boolean = false


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userString = localStorage.getItem('user')
    if (this.userString) {
      this.userName = JSON.parse(this.userString);
    } else {
      console.error('User not found in localStorage');
    }


    this.route.queryParams.subscribe(params =>{
      if(params['showModal']){
        this.showModal = true
      }
    })
  }

  OpenModalist(){
    this.router.navigate([{ outlets: { modal: ['books-list'] }}]);
    console.log("Modal abierto desde Welcome");
  }
   
}
