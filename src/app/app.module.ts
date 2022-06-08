import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { SettingComponent } from './components/shared/setting/setting.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './content/pages/material/material.component';
import { InsertUpdateMaterialComponent } from './content/pages/material/insert-update-material/insert-update-material.component';
import { GrupoMaterialComponent } from './content/pages/grupo-material/grupo-material.component';
import { HomepageComponent } from './content/pages/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { TokenHandlerService } from './content/pages/services/token-handler.service';
import { IngresoMaterialesComponent } from './content/pages/ingreso-materiales/ingreso-materiales.component';
import { InsertarStockComponent } from './content/pages/ingreso-materiales/insertar-stock/insertar-stock.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SalidaMaterialesComponent } from './content/pages/salida-materiales/salida-materiales.component';
import { IngresoSalidaMaterialesComponent } from './content/pages/salida-materiales/ingreso-salida-materiales/ingreso-salida-materiales.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    RegisterComponent,
    SettingComponent,
    MaterialComponent,
    InsertUpdateMaterialComponent,
    GrupoMaterialComponent,
    HomepageComponent,
    IngresoMaterialesComponent,
    InsertarStockComponent,
    SalidaMaterialesComponent,
    IngresoSalidaMaterialesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatStepperModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatTooltipModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    NgxMatSelectSearchModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
