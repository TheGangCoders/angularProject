import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IngresoService } from '../../services/ingreso.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-ingreso-materiales',
  templateUrl: './ingreso-materiales.component.html',
  styleUrls: ['./ingreso-materiales.component.scss'],
})
export class IngresoMaterialesComponent implements OnInit {
  form: FormGroup;
  listData: MatTableDataSource<any>;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'Nro',
    'DocumentoCompra',
    'NroDoc',
    'DescripcionOperacion',
    'Proveedor',
    'codProveedor',
    'descripcion',
    'unidadMedida',
    'cantidad',
    'precioActual',
    'Total',
    'FechaRegistro',
    'actions',
  ];
  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line: variable-name
  array_dataList: any[] = [];

  constructor(
    public _formBuilder: FormBuilder,
    private materialService: MaterialService,
    private ingresoMateriales: IngresoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMainList();
    this.createForm();
  }
  createForm() {
    this.form = this._formBuilder.group({
      searchKey: new FormControl(null),
      status: new FormControl(2),
    });
  }
  getNumber_byItem(item) {
    return this.array_dataList.indexOf(item) + 1;
  }
  getCssClassByEstado(status: string) {
    // tslint:disable-next-line: indent
    if (status) {
      return 'badge-primary';
    } else {
      return 'danger';
    }
  }
  getEstadoString(status: string) {
    if (status) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  eliminarActivar(id: number, estado: boolean) {}

  getMainList() {
    this.ingresoMateriales.listaIngresoMateriales().subscribe(
      (data: any) => {
        this.array_dataList = data;
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.MatSort;
        this.listData.paginator = this.paginator;
      },
      (errorServicio) => {
        this.toastr.error(
          'Se produjo un error al consultar con la base de datos.',
          'Error!',
          {
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
          }
        );
        console.log(errorServicio);
      }
    );
  }
  searchTable() {
    var searchKey = this.form.controls.searchKey.value;
    this.listData.filter = searchKey.trim().toLowerCase();
  }
}
