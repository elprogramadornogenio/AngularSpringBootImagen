import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { FormComponent } from "./components/clientes/form/form.component";
import { DirectivaComponent } from "./components/directiva/directiva.component";
import { DetalleComponent } from './components/clientes/detalle/detalle.component';

const routes: Routes =[
    {path: '', redirectTo: '/clientes', pathMatch: "full"},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent}
    //{path: 'clientes/ver/:id', component: DetalleComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})


export class AppRouterModule{

}