import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/header/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, NavbarComponent, RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

}
