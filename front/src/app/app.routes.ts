import { Routes } from '@angular/router';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { BooklistComponent } from './components/booklist/booklist/booklist.component';
import { ResultBooksComponent } from './components/resultBooks/result-books/result-books.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'books', component: ResultBooksComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
   /* {path: 'book/:id', component: BooklistComponent, /*canActivate:[accesoGuard]},*/

    {path:'***', redirectTo: '', pathMatch:'full'}
];
