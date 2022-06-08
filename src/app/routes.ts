import { Routes } from '@angular/router';
import { HomepageComponent } from './content/pages/homepage/homepage.component';
import { IngresoMaterialesComponent } from './content/pages/ingreso-materiales/ingreso-materiales.component';
import { InsertarStockComponent } from './content/pages/ingreso-materiales/insertar-stock/insertar-stock.component';
import { InsertUpdateMaterialComponent } from './content/pages/material/insert-update-material/insert-update-material.component';
import { MaterialComponent } from './content/pages/material/material.component';
import { IngresoSalidaMaterialesComponent } from './content/pages/salida-materiales/ingreso-salida-materiales/ingreso-salida-materiales.component';
import { SalidaMaterialesComponent } from './content/pages/salida-materiales/salida-materiales.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomepageComponent},
    {
        path: '',
        children: [
            {path: 'material', component: MaterialComponent},
            {path: 'material/add', component: InsertUpdateMaterialComponent, canActivate: [AuthGuard]},
            {path: 'material/edit', component: InsertUpdateMaterialComponent, canActivate: [AuthGuard]},
            {path: 'material/edit/:id', component: InsertUpdateMaterialComponent, canActivate: [AuthGuard]},
            {path: 'ingresos', component: IngresoMaterialesComponent, canActivate: [AuthGuard]},
            {path: 'ingresos/add', component: InsertarStockComponent, canActivate: [AuthGuard]},
            {path: 'ingresos/edit', component: InsertarStockComponent, canActivate: [AuthGuard]},
            {path: 'ingresos/edit/:id', component: InsertarStockComponent, canActivate: [AuthGuard]},
            {path: 'salidas', component: SalidaMaterialesComponent, canActivate: [AuthGuard]},
            {path: 'salidas/add', component: IngresoSalidaMaterialesComponent, canActivate: [AuthGuard]},
            {path: 'salidas/edit', component: IngresoSalidaMaterialesComponent, canActivate: [AuthGuard]},
            {path: 'salidas/edit/:id', component: IngresoSalidaMaterialesComponent, canActivate: [AuthGuard]}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];