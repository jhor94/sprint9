import { Routes } from '@angular/router';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { BooklistComponent } from './components/booklist/booklist/booklist.component';
import { ResultBooksComponent } from './components/resultBooks/result-books/result-books.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile/userprofile.component';
import { accesoGuard } from './guards/acceso.guard';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones/localizaciones.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'books', component: ResultBooksComponent},
    {path: 'books-list', component: BooklistComponent},
    {path:'areasocios', component: UserprofileComponent , canActivate: [accesoGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'localizaciones', component: LocalizacionesComponent},
    {path: 'register', component: RegisterComponent},
   
   /* {path: 'book/:id', component: BooklistComponent, /*canActivate:[accesoGuard]},*/

    {path:'***', redirectTo: '', pathMatch:'full'}
];
