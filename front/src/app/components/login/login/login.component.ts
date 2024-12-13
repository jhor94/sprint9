import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authservice/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';



//material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user/user.service';



@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, MatSlideToggleModule,MatCardModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private accesoService = inject(AuthService)
  private accesoUser = inject(UserService)
  private router = inject(Router)

  public formBuild = inject(FormBuilder)
  public emailMessage: string | null = ""

  public formLogin: FormGroup = this.formBuild.group({
    email: ["", Validators.required, Validators.email],
    password: ["", Validators.required],
  })
  submitted: any;

  LoginIn() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      this.emailMessage = "no funciona el formulario"
      console.log('error formulario')
      return;
    }

  const user: User = this.formLogin.value
        this.accesoService.login(user.email, user.password).subscribe({
          next: (response) => {
            console.log(response)
            if (response && response.accessToken) {
              localStorage.setItem('token', response.accessToken)
              localStorage.setItem('user', JSON.stringify(response.data.user))
              console.log(response.data.user)
              this.router.navigate(['areasocios'])
              console.log("logeado correcto", )
            } else {
              alert("error al registrar por token")
            }
          },
          error: (error) => {
            console.log("error al registrarse", error)
          }
        });
  
  
  }

  register() {
    this.router.navigate(['register'])
  }
}
