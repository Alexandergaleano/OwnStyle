import { Component, OnInit } from '@angular/core';
import { GestionEmpleadoService } from 'src/app/services/gestion-empleado.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {

 

  constructor(public gestionEmpleadoService:GestionEmpleadoService, private configuracion:ConfiguracionService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit() {   
    
  }

  onSubmit(){
    this.gestionEmpleadoService.empleado = this.gestionEmpleadoService.formularioRegistroEmpleado.value;

    if(this.gestionEmpleadoService.empleado.IdEmpleado==0 || this.gestionEmpleadoService.empleado.IdEmpleado==null){
      this.guardarEmpleado();
    }else{
      this.editarEmpleado();
    }

  }

  guardarEmpleado(){
    
     this.gestionEmpleadoService.guardarEmpleado().subscribe(
       res =>{
         this.gestionEmpleadoService.formularioRegistroEmpleado.reset();
         this.toastr.success("Se registró el usuario");
       },
       err =>{
         console.log(err);
       }
     )
  }

  editarEmpleado(){
    this.gestionEmpleadoService.editarEmpleado().subscribe(

      res => {
        this.gestionEmpleadoService.formularioRegistroEmpleado.reset();
        this.toastr.info("Se actualizó el usuario","usuario");
        this.gestionEmpleadoService.refrescarListaEmpleado();
      },
      err =>{
        console.log(err);
      }

    )
  }



}
