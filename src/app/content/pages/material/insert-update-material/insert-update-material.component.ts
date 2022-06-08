import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { MaterialService } from 'src/app/content/services/material.service';

@Component({
  selector: 'app-insert-update-material',
  templateUrl: './insert-update-material.component.html',
  styleUrls: ['./insert-update-material.component.scss']
})
export class InsertUpdateMaterialComponent implements OnInit {
  formMACRO: FormGroup;
  no_data: Boolean;

  load_data: Boolean = true;

  hide_load: Boolean = true;
  hide_save: Boolean = false; 

  title_page: string = 'Registrar';
  main_button: string = 'Registrar';
  main_action: string = 'Registrando...';

  update_button: string = 'Actualizar';

  is_insert: Boolean = true;

  selected_index : number = 0;

  icon_detail:string = "add";


  // tslint:disable-next-line: variable-name
  protected _onDestroy = new Subject<void>();

  arrayGrupoMaterial: any = [];
  arrayUnidadMedida: any = [];

  // tslint:disable-next-line: variable-name
  gbl_Id: any = null;

  constructor(
    private materialService: MaterialService,
    // tslint:disable-next-line: variable-name
    public _formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private change_ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getGrupoMaterial();
    this.getUnidadMedida();
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params.id;
      if (id != null){
        this.gbl_Id = id;
        this.getMaterialDetail();
      }else{
        this.main_button = 'Registrar';
      }
      
    });
  }
  onSubmit(){
    // tslint:disable-next-line: variable-name
    const _controls = this.formMACRO.controls;
    if (this.formMACRO.invalid) {
    Object.keys(_controls).forEach(controlName =>
        _controls[controlName].markAsTouched()
      );
    this.toastr.warning('Ingrese los campos obligatorios.', 'Advertencia!', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true
      });
    } else {
        var model = this.prepare_model();

        if( this.gbl_Id != null){
          this.onUpdate();
        }else{
          this.materialService.saveMaterial(model).subscribe(
            (data: any) => {
              if (data > 0){
                this.clean_main();
                this.toastr.success('Se ha guardado con exito', 'Éxito!', {
                  timeOut: 2000,
                  closeButton: true,
                  progressBar: true
                });
                this.change_ref.markForCheck();
                this.go_back();
              }
            }, ( errorServicio ) => {
              //this.hide_send=false; this.hide_load_send=true;
              console.log(errorServicio);
              this.toastr.error('Ha ocurrido un error, intentelo nuevamente', 'Error!', {
                timeOut: 2000,
                closeButton: true,
                progressBar: true
              });
              this.change_ref.markForCheck();
            }
          );
        }
    }
  }

createForm() {
    this.formMACRO = this._formBuilder.group({
      Descripcion: [null, Validators.required],
      Precio: [null, Validators.required],
      UnidadMedida: [null, Validators.required],
      GrupoMaterial: [null, Validators.required],
      Activo: [true],
      CodProveedor: [null, Validators.required],
    });
  }
go_back(){
    this.router.navigate(['/material']);
  }

getUnidadMedida() {
    this.materialService.listaVistaUnidad().subscribe(
      (data:any) => {
        this.arrayUnidadMedida = data;
        console.log(this.arrayUnidadMedida)
      }, ( errorServicio ) => {
        // this.toastr.errorToastr('Se produjo un error al consultar con la base de datos.', 'Error!', {
        //   toastTimeout: 2000,
        //   showCloseButton: true,
        //   animate: 'fade',
        //   progressBar: true
        // });
        console.log(errorServicio);
      }
    );
  }

getGrupoMaterial() {
    this.materialService.listaVistaGrupo().subscribe(
      (data:any) => {
        this.arrayGrupoMaterial = data;
      }, ( errorServicio ) => {
        // this.toastr.errorToastr('Se produjo un error al consultar con la base de datos.', 'Error!', {
        //   toastTimeout: 2000,
        //   showCloseButton: true,
        //   animate: 'fade',
        //   progressBar: true
        // });
        console.log(errorServicio);
      }
    );
  }
  clean_main(){
    this.formMACRO.reset();
  }
  prepare_model(){
    var control = this.formMACRO.controls;
    return{
      id: this.gbl_Id,
      Descripcion: control.Descripcion.value,
      GrupoMaterialesId: control.GrupoMaterial.value,
      UnidadMedidaId: control.UnidadMedida.value,
      PrecioActual: control.Precio.value,
      CodProveedor: control.CodProveedor.value
    }
  }
  getMaterialDetail(){
    this.materialService.getMaterialById(this.gbl_Id).subscribe(
      (data: any) => {
        const head = data;
        this.formMACRO.controls.Descripcion.setValue(head.materialDescripcion);
        this.formMACRO.controls.Precio.setValue(head.precioActual);
        this.formMACRO.controls.UnidadMedida.setValue(head.unidadMedidaId);
        this.formMACRO.controls.GrupoMaterial.setValue(head.grupoMaterialesId);
        this.formMACRO.controls.CodProveedor.setValue(head.codProveedor);
        this.main_button = 'Actualizar';
      }, ( errorServicio ) => {
        this.toastr.error('Se produjo un error al cargar los datos', 'Error!', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true
        });
      }
    );
  }

  onUpdate(){
    // tslint:disable-next-line: variable-name
    const _controls = this.formMACRO.controls;
    if (this.formMACRO.invalid) {
    Object.keys(_controls).forEach(controlName =>
        _controls[controlName].markAsTouched()
      );
    this.toastr.warning('Ingrese los campos obligatorios.', 'Advertencia!', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true
      });
    } else {
        var model = this.prepare_model();

        this.materialService.UpdateMaterial(model).subscribe(
          (data: any) => {
            if (data > 0){
              this.clean_main();
              this.toastr.success('Se ha actualizado con exito', 'Éxito!', {
                timeOut: 2000,
                closeButton: true,
                progressBar: true
              });
              this.change_ref.markForCheck();
              this.go_back();
            }else if (data === -2) {
              this.clean_main();
              this.toastr.warning('Material no encontrado', 'Éxito!', {
                timeOut: 2000,
                closeButton: true,
                progressBar: true
              });
              this.change_ref.markForCheck();
              this.go_back();
            }
          }, ( errorServicio ) => {
            //this.hide_send=false; this.hide_load_send=true;
            console.log(errorServicio);
            this.toastr.error('Ha ocurrido un error, intentelo nuevamente', 'Error!', {
              timeOut: 2000,
              closeButton: true,
              progressBar: true
            });
            this.change_ref.markForCheck();
          }
        );
    }
  }
}
