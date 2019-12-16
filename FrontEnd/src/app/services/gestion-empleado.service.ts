import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{HttpClient} from '@angular/common/http'
import { Empleado } from '../models/empleado';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class GestionEmpleadoService {

  formularioRegistroEmpleado = this.formBuilder.group({

    IdEmpleado:[0],
    Nombre:["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Direccion:["", [Validators.required, Validators.maxLength(60)]],
    Telefono:["", [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Email:["", [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]]
  });    

  empleado:Empleado;
  listaEmpleado:Empleado[];
  filtroEmpleado:'';

  get Nombre(){
    return this.formularioRegistroEmpleado.controls["Nombre"];
  }

  get Direccion(){
    return this.formularioRegistroEmpleado.controls["Direccion"];
  }

  get Telefono(){
    return this.formularioRegistroEmpleado.controls["Telefono"];
  }

  get Email(){
    return this.formularioRegistroEmpleado.controls["Email"];
  }

  

  constructor(private http:HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  guardarEmpleado(){
    if(this.empleado.IdEmpleado==null){
      this.empleado.IdEmpleado=0;
    }
    //console.log(this.empleado);   
    return this.http.post(this.configuracion.rootURL + '/Empleado', this.empleado)
  }

  editarEmpleado(){
    //console.log(this.empleado);   
    return this.http.put(this.configuracion.rootURL + '/Empleado/' + this.empleado.IdEmpleado, this.empleado)
  }

  eliminarEmpleado(id:number){
    return this.http.delete(this.configuracion.rootURL + '/Empleado/' + id)
  }

  refrescarListaEmpleado(){
    this.http.get(this.configuracion.rootURL + '/Empleado')
    .toPromise()
    .then(res=> this.listaEmpleado = res as Empleado[])
  }


}
