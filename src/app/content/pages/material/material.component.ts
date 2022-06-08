import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  form: FormGroup;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'CodProveedor', 'Descripcion', 'Precio', 'Grupo', 'Cantidad', 'UnidadMedida', 'Activo', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line: variable-name
  array_dataList: any[] = [];

  constructor(
    private materialService: MaterialService,
    // tslint:disable-next-line: variable-name
    public _formBuilder: FormBuilder,
    private library: FaIconLibrary
  ) { library.addIcons(faSearch)}

  ngOnInit(): void {
    this.getMainList();
    this.createForm();
  }

  createForm(){
    this.form = this._formBuilder.group({
      searchKey: new FormControl(null),
      status: new FormControl(2),
    });
  }
  getNumber_byItem(item){
    return this.array_dataList.indexOf(item) + 1;
  }
  getCssClassByEstado(status: string){
// tslint:disable-next-line: indent
		if (status) {
    return 'badge-primary';
} else {
  return 'danger';
		}
	}
  getEstadoString(status: string){
		if (status) {
			return 'SI';
		} else {
		  	return 'NO';
		}
  }
  eliminarActivar(id: number, estado: boolean){

  }
  getMainList() {
    this.materialService.listaMaterial().subscribe(
      (data:any) => {
        this.array_dataList = data;
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.MatSort;
        this.listData.paginator = this.paginator;
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
  searchTable() {
    var searchKey = this.form.controls['searchKey'].value;
    this.listData.filter = searchKey.trim().toLowerCase();
  }


}
