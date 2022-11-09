import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CLIENTES } from '../json/clientes.json';
import localeEs from '@angular/common/locales/es';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = 'http://localhost:3333/api/clientes';

  constructor(private http: HttpClient, private router: Router) { }

  /* getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.url).pipe(
      tap(response =>{
        console.log("Tap 1");
        response.forEach( cliente => {
          console.log(cliente.nombre);
        })
      }),
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt!, 'dd-MM-yyyy', 'en-US');
          let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt!, 'EEEE dd, MMMM yyyy' )!;
          return cliente;
        });
      }),
      tap(response =>{
        console.log("Tap 2");
        response.forEach( cliente => {
          console.log(cliente.nombre);
        })
      }),
    );
  } */

  getClientes(page: number): Observable<any> {
    
    return this.http.get(`${this.url}/page/${page}`).pipe(
      tap((response: any) =>{
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        })
        return response;
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          /* cliente.createAt = formatDate(cliente.createAt!, 'dd-MM-yyyy', 'en-US'); */
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt!, 'EEEE dd, MMMM yyyy' )!;
          return cliente;
        });
        return response;
      }),
      tap(response =>{
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        })
      }),
    );
  }

  create(cliente: Cliente): Observable<Cliente>{

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(this.url, cliente, {headers: httpHeaders}).pipe(
      map((response: any) => {
        return response.cliente as Cliente
      }),
      catchError(e =>{
        if(e.status == 400) {
          return throwError(()=>e);
        }
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        });
        return throwError(()=>e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: 'error',
          title: 'Error al editar',
          text: e.error.mensaje
        });
        return throwError(()=>e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400) {
          return throwError(()=>e);
        }
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        });
        return throwError(()=>e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        });
        return throwError(()=>e);
      })
    );
  }

  subirFoto(archivo: File, id: number): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", String(id));
    const req = new HttpRequest('POST', `${this.url}/upload`,formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
