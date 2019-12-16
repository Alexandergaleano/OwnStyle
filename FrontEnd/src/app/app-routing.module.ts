import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroUsuarioComponent } from './components/usuario/registro-usuario/registro-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { GestionEstablecimientoComponent } from './components/gestion-establecimiento/gestion-establecimiento.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';


const routes: Routes = [
  {path:'', redirectTo: 'usuario/login', pathMatch:'full'},
  {path:'usuario', component: UsuarioComponent,
    children:[
      {path:'registro', component:RegistroUsuarioComponent},
      {path: 'login', component:LoginComponent}
    ]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]}
];

/*const routes: Routes = [
  {path:'', redirectTo: 'gestion-empleados', pathMatch:'full'},
  {path:'gestion-empleados', component: GestionEmpleadosComponent}
  
];*/

/*const routes: Routes = [
  {path:'', redirectTo: 'gestion-establecimiento', pathMatch:'full'},
  {path:'gestion-establecimiento', component: GestionEstablecimientoComponent}
  
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
