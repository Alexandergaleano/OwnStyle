import { Component, OnInit } from '@angular/core';
import { GestionEstablecimientoService } from 'src/app/services/gestion-establecimiento.service';
import { Establecimiento } from 'src/app/models/establecimiento';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-establecimiento',
  templateUrl: './listar-establecimiento.component.html',
  styleUrls: ['./listar-establecimiento.component.css']
})
export class ListarEstablecimientoComponent implements OnInit {

  constructor(public gestionEstablecimientoService:GestionEstablecimientoService, private toastr:ToastrService) { }

  ngOnInit() {

    this.gestionEstablecimientoService.refrescarListaEstablecimiento();
  }
  
  llenarFormularioEstablecimiento(establecimiento:Establecimiento){
    this.gestionEstablecimientoService.formularioRegistroEstablecimiento.patchValue(establecimiento);

  }

  eliminarEstablecimiento(id:number ){
    if(confirm(("Estas seguro de eliminar el Establecimiento?"))){
      this.gestionEstablecimientoService.eliminarEstablecimiento(id).subscribe(
      res => {
        this.gestionEstablecimientoService.refrescarListaEstablecimiento();
        this.toastr.error("Establecimiento eliminado con exito", "Eliminar Establecimiento")
      }

      )


    }

  }

}
