import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  autor: any = {
    nombre : 'Oculus',
    apellido: 'Horus'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
