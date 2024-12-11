import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';

//material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/authservice/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,MatSlideToggleModule,MatCardModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatError, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private accesoService = inject(AuthService)
  private router = inject(Router)

  public formBuild = inject(FormBuilder)
  public successMessage : string | null = null
  public errorMessage : string | null = null
  public submitted: boolean | null = false


  

  public formRegister: FormGroup = this.formBuild.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  })
  

  registerIn() {
    this.submitted = true;
    if (this.formRegister.invalid) {
     this.errorMessage= "error formulario"
     return;
    }

    const user: User = this.formRegister.value


    this.accesoService.checkEmail(user.email).subscribe(emailExists =>{
        if (emailExists) {
          this.errorMessage = "El correo ya esta en uso";
          console.log("existe entra")
          return;
        } else {
          this.accesoService.register(user).subscribe({
            next: (response) => {
              console.log("registrado correctamente", response);

              if(response.accessToken){
                localStorage.setItem('token',response.accessToken);
                this.successMessage = "Registrado con exito"
                this.router.navigate(['starship'])
              }else{
                alert("error al registrar por token")
                console.log(user)
              }
            },
            error: (error) => {
              console.log("error al registrarse", error)
            }
          });
        }
 
    })

  }

    constructor(){
    }
}
