import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  usuario:Usuario;

  formularioRegistroUsuario = this.formBuilder.group({      
    NombreUsuario:["", [Validators.required,Validators.maxLength(20), Validators.pattern(this.configuracion.exLetrasNumeros)]],
    Email:["", [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]],
    Nombre:["", [Validators.required, Validators.maxLength(40)]],
    Direccion:["", [Validators.required]],
    Telefono:["", [Validators.required]],
    Password:["", [Validators.required, Validators.maxLength(20), Validators.pattern(this.configuracion.exRegularPassword)]],
    ConfirmarPassword:["", [Validators.required]]
  },
  {
    validator:this.compararPassword.bind(this)
  });

  formularioLogin = this.formBuilder.group({
    NombreUsuario:["", [Validators.required, Validators.maxLength(20)]],
    Password:["", [Validators.required, Validators.maxLength(20)]]
  });


  get Email(){
    return this.formularioRegistroUsuario.controls["Email"];
  }

  get Nombre(){
    return this.formularioRegistroUsuario.controls["Nombre"];
  }

  get NombreUsuario(){
    return this.formularioRegistroUsuario.controls["NombreUsuario"];
  }

  get Telefono(){
    return this.formularioRegistroUsuario.controls["Telefono"];
  }

  get Direccion(){
    return this.formularioRegistroUsuario.controls["Direccion"];
  }

  get Password(){
    return this.formularioRegistroUsuario.controls["Password"];
  }

  get ConfirmarPassword(){
    return this.formularioRegistroUsuario.controls["ConfirmarPassword"];
  }

  get NombreUsuarioLogin(){
    return this.formularioLogin.controls["NombreUsuario"]
  }

  get PasswordLogin(){
    return this.formularioLogin.controls["Password"]
  }

  registrarUsuario(){
    this.usuario = this.formularioRegistroUsuario.value;
    delete this.usuario['ConfirmarPassword']
    return this.http.post(this.configuracion.rootURL + '/Usuario/Registro', this.usuario);
  }

  login(){
    this.usuario = this.formularioLogin.value;
    delete this.usuario['Email'];
    delete this.usuario['Nombre'];
    delete this.usuario['Telefono'];
    delete this.usuario['Direccion'];

    return this.http.post(this.configuracion.rootURL + '/Usuario/Login', this.usuario);
  }

  obtenerPerfil(){    
    return this.http.get(this.configuracion.rootURL + '/PerfilUsuario');
  }
 


  compararPassword(formGroup:FormGroup){

    const password = formGroup.get('Password');
    const confirmarPassword = formGroup.get('ConfirmarPassword');

    if(confirmarPassword.errors==null || 'passwordDiferente' in confirmarPassword)
    if(password.value != confirmarPassword.value){
      confirmarPassword.setErrors({passwordDiferente:true})
    }else{
      confirmarPassword.setErrors(null);
    }

  };


};






