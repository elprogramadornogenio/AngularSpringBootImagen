import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = {
    nombre: 'Oculis',
    apellido: 'Terton',
    email: 'oculisterton@gmail.com'
  };
  public titulo: string = "Crear Cliente";

  errores: string[] = [];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  create() {
    //@Deprecated
    /* this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Nuevo Cliente!',
          text: `El cliente con nombre ${cliente.nombre} `,
          icon: 'success'
        });
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    ); */

    this.clienteService.create(this.cliente).subscribe({
      next: (cliente) => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Nuevo Cliente!',
          text: `El cliente con nombre ${cliente.nombre} `,
          icon: 'success'
        });
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }

  update() {
    /* this.clienteService.update(this.cliente).subscribe(resp => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Cliente Actualizado!',
        text: `${resp.mensaje}: ${resp.cliente.nombre}`,
        icon: 'success'
      });
    }) */

    this.clienteService.update(this.cliente).subscribe({
      next: (resp) => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Cliente Actualizado!',
          text: `${resp.mensaje}: ${resp.cliente.nombre}`,
          icon: 'success'
        });
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }

}
