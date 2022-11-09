import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;
  paginas: number[] = [];

  desde: number = 0;
  hasta: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginator'];
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  ngOnInit(): void {
    this.initPaginator();

  }

  private initPaginator() {
    this.desde = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => {
        return indice + 1
      });
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => {
        return indice + 1
      });
    }
  }

}
