import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './models/cliente';
import { ClienteService } from './services/cliente.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/services/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginator: any;
  clienteSeleccionado!: Cliente;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private modalServices: ModalService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page = Number(params.get('page'));
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });

        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginator = response;
      });
    });

    this.modalServices.notificarUpload.subscribe(cliente=>{
      this.clientes = this.clientes.map(clienteOriginal =>{
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });

  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id!).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          swalWithBootstrapButtons.fire(
            'Cliente Eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito`,
            'success'
          );
        });

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `Cliente ${cliente.nombre} no eliminado`,
          'error'
        );
      }
    })
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalServices.abrirModal();
  }
}
