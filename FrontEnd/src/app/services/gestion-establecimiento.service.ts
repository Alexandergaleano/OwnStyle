import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{HttpClient} from '@angular/common/http'
import { Establecimiento } from '../models/establecimiento';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class GestionEstablecimientoService {

  formularioRegistroEstablecimiento = this.formBuilder.group({

    IdEstablecimiento:[0],
    Nombre:["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Direccion:["", [Validators.required, Validators.maxLength(60)]],
    Telefono:["", [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Email:["", [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]]
  });    

  establecimiento:Establecimiento;
  listaEstablecimiento:Establecimiento[];
  filtroEstablecimiento:'';
  

  get Nombre(){
    return this.formularioRegistroEstablecimiento.controls["Nombre"];
  }

  get Direccion(){
    return this.formularioRegistroEstablecimiento.controls["Direccion"];
  }

  get Telefono(){
    return this.formularioRegistroEstablecimiento.controls["Telefono"];
  }

  get Email(){
    return this.formularioRegistroEstablecimiento.controls["Email"];
  }

  

  constructor(private http:HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  guardarEstablecimiento(){
    if(this.establecimiento.IdEstablecimiento==null){
      this.establecimiento.IdEstablecimiento=0;
    }
    //console.log(this.establecimiento);   
    return this.http.post(this.configuracion.rootURL + '/Establecimientoes', this.establecimiento)
  }

  editarEstablecimiento(){
    //console.log(this.establecimiento);   
    return this.http.put(this.configuracion.rootURL + '/Establecimientoes/' + this.establecimiento.IdEstablecimiento, this.establecimiento)
  }

  eliminarEstablecimiento(id:number){
    return this.http.delete(this.configuracion.rootURL + '/Establecimientoes/' + id)
  }

  refrescarListaEstablecimiento(){
    this.http.get(this.configuracion.rootURL + '/Establecimientoes')
    .toPromise()
    .then(res=> this.listaEstablecimiento = res as Establecimiento[])
  }


}

