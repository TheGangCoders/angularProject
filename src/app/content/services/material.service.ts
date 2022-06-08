import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private http: HttpClient) {
  }
  public listaMaterial() {
    return this.http.get(`${environment.api.WS_Core.url}/Materiales`).pipe(map(data => data));
  }
  public listaMaterialstock() {
    return this.http.get(`${environment.api.WS_Core.url}/Materiales/ListarStock`).pipe(map(data => data));
  }
  public listaVistaGrupo() {
    return this.http.get(`${environment.api.WS_Core.url}/GrupoMaterial/VistaGrupo`).pipe(map(data => data));
  }
  public listaVistaUnidad() {
    return this.http.get(`${environment.api.WS_Core.url}/UnidadesMedida/VistaUnidad`).pipe(map(data => data));
  }
  public saveMaterial(Model: any) {
    return this.http.post(`${environment.api.WS_Core.url}/Materiales`,
    Model).pipe(map(data => data));
    }
  public UpdateMaterial(Model: any) {
    return this.http.put(`${environment.api.WS_Core.url}/Materiales/UpdateMat/${Model.id}`, Model).pipe(map(data => data));
  }
  public getMaterialById(id: string) {
    return this.http.get(`${environment.api.WS_Core.url}/Materiales/MaterialById/${id}`).pipe(map(data => data));
  }
}
