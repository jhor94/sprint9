import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-friends',
  imports: [],
  templateUrl: './list-friends.component.html',
  styleUrl: './list-friends.component.scss'
})
export class ListFriendsComponent implements OnInit {

  listusers: User[]=[]
  userService= inject(UserService)
  userString: string| null = null
  usersesion:any= null

  ngOnInit(): void {
    this.userString = localStorage.getItem('user')
    if (this.userString) {
      this.usersesion = JSON.parse(this.userString);
    } else {
      console.error('User not found in localStorage');
    }
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: User[]) => {
      this.listusers = response
      console.log(response, "lista de usuarios")
    })
  }

}
