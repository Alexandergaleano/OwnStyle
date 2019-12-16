import { Component, OnInit } from '@angular/core';
import { GestionEmpleadoService } from 'src/app/services/gestion-empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  constructor(public gestionEmpleadoService:GestionEmpleadoService, private toastr:ToastrService) { }

  ngOnInit() {
    this.gestionEmpleadoService.refrescarListaEmpleado();
  }

  llenarFormularioEmpleado(empleado:Empleado){
    
    this.gestionEmpleadoService.formularioRegistroEmpleado.patchValue(empleado);

  }

  eliminarEmpleado(id:number){
    if(confirm(("¿Estás seguro de eliminar el usuario?"))){
      this.gestionEmpleadoService.eliminarEmpleado(id).subscribe(
        res => {
          this.gestionEmpleadoService.refrescarListaEmpleado();
          this.toastr.error("usuario eliminado con exito", "Eliminar usuario");
        }
      )

    }
  }

}
