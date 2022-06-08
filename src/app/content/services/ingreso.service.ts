import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  constructor(private http: HttpClient) {}
  public listaIngresoMateriales() {
    return this.http
      .get(`${environment.api.WS_Core.url}/IngresoMateriales/ListaIngresos`)
      .pipe(map((data) => data));
  }
  public listaProveedores() {
    return this.http
      .get(`${environment.api.WS_Core.url}/Proveedor/VistaProveedores`)
      .pipe(map((data) => data));
  }
  public saveIngreso(Model: any) {
    return this.http
      .post(`${environment.api.WS_Core.url}/IngresoMateriales`, Model)
      .pipe(map((data) => data));
  }
  public getDespachoById(id: string) {
    return this.http
      .get(`${environment.api.WS_Core.url}/IngresoMateriales/IngresoById/${id}`)
      .pipe(map((data) => data));
  }
  public saveSalida(Model: any) {
    return this.http
      .post(`${environment.api.WS_Core.url}/SalidaMateriales/Salidas`, Model)
      .pipe(map((data) => data));
  }
  public listaSalida() {
    return this.http
      .get(`${environment.api.WS_Core.url}/SalidaMateriales/ListaSalidas`)
      .pipe(map((data) => data));
  }
}
