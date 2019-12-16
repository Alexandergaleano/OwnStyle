import { Component, OnInit } from '@angular/core';
import { GestionEstablecimientoService } from 'src/app/services/gestion-establecimiento.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-registrar-establecimiento',
  templateUrl: './registrar-establecimiento.component.html',
  styleUrls: ['./registrar-establecimiento.component.css']
})
export class RegistrarEstablecimientoComponent implements OnInit {

 

  constructor(public gestionEstablecimientoService:GestionEstablecimientoService, private configuracion:ConfiguracionService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit() {   
    
  }

  onSubmit(){
    this.gestionEstablecimientoService.establecimiento = this.gestionEstablecimientoService.formularioRegistroEstablecimiento.value;

    if(this.gestionEstablecimientoService.establecimiento.IdEstablecimiento==0 || this.gestionEstablecimientoService.establecimiento.IdEstablecimiento==null){
      this.guardarEstablecimiento();
    }else{
      this.editarEstablecimiento();
    }

  }

  guardarEstablecimiento(){
    
     this.gestionEstablecimientoService.guardarEstablecimiento().subscribe(
       res =>{
         this.gestionEstablecimientoService.formularioRegistroEstablecimiento.reset();
         this.toastr.success("Se registró el establecimiento");
       },
       err =>{
         console.log(err);
       }
     )
  }

  editarEstablecimiento(){
    this.gestionEstablecimientoService.editarEstablecimiento().subscribe(

      res => {
        this.gestionEstablecimientoService.formularioRegistroEstablecimiento.reset();
        this.toastr.info("Se actualizó el establecimiento","establecimiento");
        this.gestionEstablecimientoService.refrescarListaEstablecimiento();
      },
      err =>{
        console.log(err);
      }

    )
  }



}
