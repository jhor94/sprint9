import { Routes } from '@angular/router';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { BooklistComponent } from './components/booklist/booklist/booklist.component';
import { ResultBooksComponent } from './components/resultBooks/result-books/result-books.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'books', component: ResultBooksComponent},
   /* {path: 'book/:id', component: BooklistComponent, /*canActivate:[accesoGuard]},*/

    {path:'***', redirectTo: '', pathMatch:'full'}
];
