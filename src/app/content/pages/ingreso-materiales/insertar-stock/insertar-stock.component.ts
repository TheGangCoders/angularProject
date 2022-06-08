import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { MatSelectSearchVersion } from 'ngx-mat-select-search';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IngresoService } from 'src/app/content/services/ingreso.service';
import { MaterialService } from 'src/app/content/services/material.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-insertar-stock',
  templateUrl: './insertar-stock.component.html',
  styleUrls: ['./insertar-stock.component.scss'],
  providers: [ DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InsertarStockComponent implements OnInit {
  formMACRO: FormGroup;
  formDETA: FormGroup;

  listData: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'Nro',
    'Material',
    'Cantidad',
    'Precio',
    'FechaVencimiento',
    'Lote',
    'Activo',
    'Actions',
  ];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  array_dataList: any[] = [];

  arrayMateriles: any = [];
  arrayProveedores: any = [];

  no_data: Boolean;

  load_data: Boolean = true;

  protected _onDestroy = new Subject<void>();

  public filterMateriles: FormControl = new FormControl();
  public filterProveedor: FormControl = new FormControl();

  public filteredMateriales: ReplaySubject<any> = new ReplaySubject<any>();
  public filteredProveedor: ReplaySubject<any> = new ReplaySubject<any>();
  matSelectSearchVersion = MatSelectSearchVersion;
  title_page = 'Registrar';
  main_button = 'Registrar';
  main_action = 'Registrando...';

  main_title = 'Registrar';

  viewsActions: Array<Navigation> = [];

  is_insert: Boolean = true;

  selected_index = 0;

  icon_detail = 'add';

  hide_load: Boolean = true;

  hide_save = false;

  general_disable = false;

  hide_insert = false;

  err = 0;

  array_detalleServe: any[] = [];

  gbl_Id: any = null;

  glb_disabled = false;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private change_ref: ChangeDetectorRef,
    private router: Router,
    private materialService: MaterialService,
    private ingresoService: IngresoService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.listarCboMateriales();
    this.listarCboProveedores();
    this.activatedRoute.queryParams.subscribe((params) => {
      const id = params.id;
      if (id != null) {
        this.title_page = 'Editar';
        this.main_button = 'Editar';
        this.main_action = 'Editando...';

        this.gbl_Id = id;
        this.glb_disabled = true;

        this.getDataDetail();
        this.main_title = 'Visualizar';
      } else {
      }
    });
  }
  createForm() {
    this.formMACRO = this._formBuilder.group({
      DocumentoCompra: [null, Validators.required],
      Serie: [null, Validators.required],
      Numero: [null, Validators.required],
      Moneda: [null, Validators.required],
      Proveedor: [null, Validators.required],
    });

    this.formDETA = this._formBuilder.group({
      Cantidad: [null, Validators.required],
      Precio: [null, Validators.required],
      Material: [null, Validators.required],
      FechaVencimiento: [new Date(), Validators.required],
      Lote: [null, Validators.required]
    });
  }
  go_back() {
    this.router.navigate(['/ingresos']);
  }
  getNumber_byItem(item) {
    return this.array_dataList.indexOf(item) + 1;
  }
  onSubmit() {
    const _controls = this.formMACRO.controls;
    if (this.formMACRO.invalid) {
      Object.keys(_controls).forEach((controlName) =>
        _controls[controlName].markAsTouched()
      );
      this.toastr.warning('Ingrese los campos obligatorios.', 'Advertencia!', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
      });
    } else {
      if (this.array_dataList.length > 0) {
        const model = this.prepared_mode();

        this.ingresoService.saveIngreso(model).subscribe(
          (data: any) => {
            if (data > 0) {
              this.array_dataList = [];
              this.clean_main();
              this.toastr.success('Se ha guardado con exito', 'Éxito!', {
                timeOut: 2000,
                closeButton: true,
                progressBar: true,
              });
              this.change_ref.markForCheck();
              this.go_back();
            } else {
              this.toastr.warning(
                'Un error ha ocurrido durante el guardado de datos, intente nuevamente',
                'Advertencia!',
                {
                  timeOut: 2000,
                  closeButton: true,
                  progressBar: true,
                }
              );
            }
          },
          (errorServicio) => {
            // this.hide_send=false; this.hide_load_send=true;
            console.log(errorServicio);
            this.toastr.error(
              'Ha ocurrido un error, intentelo nuevamente',
              'Error!',
              {
                timeOut: 2000,
                closeButton: true,
                progressBar: true,
              }
            );
            this.change_ref.markForCheck();
          }
        );
      }
    }
  }

  getDataDetail() {
    //this.hide_save = true;

    this.ingresoService.getDespachoById(this.gbl_Id).subscribe(
      (data: any) => {
        var head = data;
        this.formMACRO.controls.DocumentoCompra.setValue(
          String(head.documentoCompraId).toUpperCase()
        );
        this.formMACRO.controls.Serie.setValue(head.serieGuia);
        this.formMACRO.controls.Numero.setValue(head.nroGuia);
        this.formMACRO.controls.Moneda.setValue(
          String(head.monedaId).toUpperCase()
        );
        this.formMACRO.controls.Proveedor.setValue(head.proveedorId);

        this.array_dataList = data.detalleMovimientoAlmacen;

        this.listData = new MatTableDataSource(this.array_dataList);
        this.listData.sort = this.MatSort;

        //this.array_dataList = data[1];
        this.listar_Deta();
      },
      (errorServicio) => {
        this.toastr.error('Se produjo un error al cargar los datos', 'Error!', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      }
    );
  }
  add_Deta() {
    const _controls = this.formDETA.controls;
    if (this.formDETA.invalid) {
      Object.keys(_controls).forEach((controlName) =>
        _controls[controlName].markAsTouched()
      );
      this.toastr.warning('Ingrese los campos obligatorios.', 'Advertencia!', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
      });
      return;
    } else {
      if (this.verify_detas(_controls.Material.value)) {
        if (this.is_insert) {
          this.array_dataList.push({
            material: _controls.Material.value,
            materialDes: this.arrayMateriles.find(
              (item) => item.materialId === _controls.Material.value
            ).materialDescripcion,
            cantidad: _controls.Cantidad.value,
            precio: _controls.Precio.value,
            activo: 1,
            fechaVencimiento: _controls.FechaVencimiento.value,
            lote: _controls.Lote.value
          });
          console.log(this.arrayMateriles);
        } else {
          this.array_dataList[this.selected_index] = {
            material: _controls.Material.value,
            materialDes: this.arrayMateriles.find(
              (item) => item.materialId === _controls.Material.value
            ).materialDescripcion,
            cantidad: _controls.Cantidad.value,
            precio: _controls.Precio.value,
            activo: 1,
            fechaVencimiento: _controls.FechaVencimiento.value,
            lote: _controls.Lote.value
          };
        }
        this.icon_detail = 'add';
        this.is_insert = true;
        this.formDETA.reset();
        this.listar_Deta();
      } else {
        if (this.err == 1) {
          this.toastr.warning(
            'Ya existe una Cuenta Bancaria por Defecto',
            'Advertencia!',
            {
              timeOut: 2000,
              closeButton: true,
              progressBar: true,
            }
          );
        } else if (this.err == 2) {
          this.toastr.warning(
            'Ya existe una Cuenta con este Número de Cuenta',
            'Advertencia!',
            {
              timeOut: 2000,
              closeButton: true,
              progressBar: true,
            }
          );
        }
      }

      return;
    }
  }
  cleanDeta() {
    this.is_insert = true;
    this.icon_detail = 'add';
    this.formDETA.reset();
  }

  getCssClassByEstado(status: Boolean) {
    if (status) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  getEstadoString(status: Boolean) {
    if (status) {
      return 'SI';
    } else {
      return 'NO';
    }
  }

  delete_detail(item) {
    console.log(item);
    const index = this.array_dataList.indexOf(item);
    console.log(index);
    this.array_dataList.splice(index, 1);
    this.listar_Deta();
  }
  get_detail(item) {
    this.icon_detail = 'edit';
    this.is_insert = false;
    const index = this.array_dataList.indexOf(item);
    this.selected_index = index;
    const control = this.formDETA.controls;
    control.Material.setValue(item.material);
    control.Precio.setValue(item.precio);
    control.Cantidad.setValue(item.cantidad);
    control.FechaVencimiento.setValue(item.fechaVencimiento);
    control.Lote.setValue(item.lote);
    this.change_ref.markForCheck();
  }
  add_detail(item) {
    const index = this.array_dataList.indexOf(item);
    this.array_dataList[index] = {
      material: item.material,
      materialDes: item.materialDes,
      cantidad: item.cantidad,
      precio: item.precio,
      activo: 1,
      FechaVencimiento: item.FechaVencimiento,
      Lote: item.Lote
    };
  }

  listarCboMateriales() {
    this.materialService.listaMaterial().subscribe(
      (data: any) => {
        this.arrayMateriles = data;

        // this.formMACRO.controls.Sociedad.setValue(this.posible_sociedad);

        this.filteredMateriales.next(this.arrayMateriles.slice());
        this.filterMateriles.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filtrar_Material();
          });
      },
      (errorServicio) => {
        this.toastr.error(
          'Se produjo un error al cargar sociedades',
          'Error!',
          {
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
          }
        );
      }
    );
  }

  filtrar_Material() {
    if (this.arrayMateriles.length === 0) {
      return;
    }
    let search = this.filterMateriles.value;
    if (!search) {
      this.filteredMateriales.next(this.arrayMateriles.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredMateriales.next(
      this.arrayMateriles.filter(
        (material) =>
          material.materialDescripcion.toLowerCase().indexOf(search) > -1
      )
    );
  }

  listarCboProveedores() {
    this.ingresoService.listaProveedores().subscribe(
      (data: any) => {
        this.arrayProveedores = data;

        // this.formMACRO.controls.Sociedad.setValue(this.posible_sociedad);

        this.filteredProveedor.next(this.arrayProveedores.slice());
        this.filterProveedor.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filtrar_proveedor();
          });
      },
      (errorServicio) => {
        this.toastr.error(
          'Se produjo un error al cargar sociedades',
          'Error!',
          {
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
          }
        );
      }
    );
  }

  filtrar_proveedor() {
    if (this.arrayProveedores.length === 0) {
      return;
    }
    let search = this.filterProveedor.value;
    if (!search) {
      this.filteredProveedor.next(this.arrayProveedores.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProveedor.next(
      this.arrayProveedores.filter(
        (material) => material.descripcion.toLowerCase().indexOf(search) > -1
      )
    );
  }

  verify_detas(Material): Boolean {
    let allow = true;
    const copy = this.array_dataList;
    // tslint:disable-next-line: variable-name
    const encontrado = copy.find((item) => item.material === Material);

    if (
      encontrado != undefined &&
      (this.is_insert ||
        (!this.is_insert &&
          this.array_dataList.indexOf(encontrado) != this.selected_index))
    ) {
      allow = false;
      this.err = 1;
    }
    return allow;
  }

  listar_Deta() {
    this.listData = new MatTableDataSource(this.array_dataList);
    this.listData.sort = this.MatSort;
    if (this.array_dataList.length > 0) {
      this.no_data = true;
    } else {
      this.no_data = false;
    }
  }
  prepared_mode() {
    this.array_dataList.forEach((item) => {
      this.array_detalleServe.push({
        MaterialId: item.material,
        PrecioUnitario: item.precio,
        Cantidad: item.cantidad,
        FechaVencimiento: this.datePipe.transform(item.fechaVencimiento, 'yyyy-MM-dd'),
        Lote: item.lote
      });
    });
    const control = this.formMACRO.controls;
    return {
      OperacionesAlmacenId: 'D39AE97E-C143-422F-8BF1-D09270398694',
      DocumentoCompraId: control.DocumentoCompra.value,
      ProveedorId: control.Proveedor.value,
      SerieGuia: control.Serie.value,
      NroGuia: control.Numero.value,
      MonedaId: control.Moneda.value,
      DetalleMovimientoAlmacen: this.array_detalleServe
    };
  }
  clean_main() {
    this.formMACRO.reset();
    this.formDETA.reset();
  }
}
