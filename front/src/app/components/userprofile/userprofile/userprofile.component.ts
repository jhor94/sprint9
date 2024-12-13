import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  personaServicio = inject(UserService)
  listaUser: User[] = []
  user:any = null;


  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    } else {
      console.error('User not found in localStorage');
    }
   // this.getListaUser()

  }

  constructor(/*private toastr: ToastrService*/) { }

  getListaUser() {
    this.personaServicio.getUsers().subscribe((data: User[]) => {
      this.listaUser = data
    })
    console.log(this.listaUser, "lista de usuarios")
  }

  borrarPersona(id: number) {
    if (confirm(`Estas seguro que quieres borrar este usuario?`)) {

      this.personaServicio.deleteUser(id).subscribe(() => {
        this.getListaUser();
       // this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
      })
    } else {
      console.log('La persona no fue eliminada', 'Persona no eliminada')
    }

  }
}
