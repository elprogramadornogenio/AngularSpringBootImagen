import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AppRouterModule } from './app.routes';
import { FormComponent } from './components/clientes/form/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es'
  },
  { 
    provide: MAT_DATE_LOCALE, 
    useValue: 'es-CO' 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
