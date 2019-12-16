import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { RegistrarEmpleadoComponent } from './components/gestion-empleados/registrar-empleado/registrar-empleado.component';
import { ListarEmpleadoComponent } from './components/gestion-empleados/listar-empleado/listar-empleado.component';

import{FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GestionEmpleadoService } from './services/gestion-empleado.service';

import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from 'ngx-toastr';
import { FiltroEmpleadoPipe } from './pipes/filtro-empleado.pipe';
import { ConfiguracionService } from './services/configuracion.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistroUsuarioComponent } from './components/usuario/registro-usuario/registro-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { GestionEstablecimientoComponent } from './components/gestion-establecimiento/gestion-establecimiento.component';
import { ListarEstablecimientoComponent } from './components/gestion-establecimiento/listar-establecimiento/listar-establecimiento.component';
import { RegistrarEstablecimientoComponent } from './components/gestion-establecimiento/registrar-establecimiento/registrar-establecimiento.component';
import { FiltroEstablecimientoPipe } from './pipes/filtro-establecimiento.pipe';
import { GestionEstablecimientoService } from './services/gestion-establecimiento.service';


@NgModule({
  declarations: [
    AppComponent,
    GestionEmpleadosComponent,
    RegistrarEmpleadoComponent,
    ListarEmpleadoComponent,
    FiltroEmpleadoPipe,
    UsuarioComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    GestionEstablecimientoComponent,
    RegistrarEstablecimientoComponent,
    ListarEstablecimientoComponent,
    FiltroEstablecimientoPipe
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    })

  ],
  providers: [GestionEmpleadoService,GestionEstablecimientoService,ConfiguracionService, UsuarioComponent, {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
