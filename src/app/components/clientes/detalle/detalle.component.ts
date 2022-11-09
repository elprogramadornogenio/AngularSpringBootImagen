import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente"

  @Input() cliente: Cliente = {
    nombre: "",
    apellido: "",
    createAt: "",
    email: ""
  }

  progreso: number = 0;

  fotoSeleccionada!: File | null;

  constructor(private clienteServices: ClienteService, private activatedRoute: ActivatedRoute, public modalServices: ModalService) { }

  ngOnInit(): void {
    /* this.activatedRoute.paramMap.subscribe(params => {
      let id = Number(params.get('id'));
      if (id) {
        this.clienteServices.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    }) */
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada!.type.indexOf('image')) {
      Swal.fire({
        icon: 'error',
        title: "Error seleccionar Imagen",
        text: `Error el archivo debe ser de tipo imagen`
      });
      this.fotoSeleccionada = null;
    }



  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: "Error no hay foto",
        text: `Error no hay foto seleccionada`
      });
    } else {
      this.clienteServices.subirFoto(this.fotoSeleccionada, this.cliente.id!).subscribe(event => {
        /* this.cliente = cliente; */
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          this.modalServices.notificarUpload.emit(this.cliente);
          Swal.fire({
            icon: 'success',
            title: "La foto se ha subido",
            text: response.mensaje
          });
        }

      });
    }

  }

  cerrarModal(){
    this.modalServices.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
