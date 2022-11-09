import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Bienvenido al curso';

  curso: string = 'Curso Spring con Angular 7';

  profesor: string = 'Oculus Electro Soft';

}
