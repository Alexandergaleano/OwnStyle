import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(public usuarioService:UsuarioService, private toastr: ToastrService) { }

  sw:number;

  onSubmit(){
    this.sw=0;
    this.usuarioService.registrarUsuario().subscribe(
      (respuesta:any)=>{
        if(respuesta.Succeeded){
          this.usuarioService.formularioRegistroUsuario.reset();
          this.toastr.success("Usuario creado exitosamente")
          this.sw=1;
        }else{
          respuesta.Errors.forEach(elemento =>{
            switch(elemento.Code){
              case 'DuplicateUserName':
                this.toastr.error("El nombre de usuario ya existe", "Registro fallido");
                this.sw=1;
                break;
              case 'DuplicateEmail':
                this.toastr.error("El email ya existe", "Registro fallido");
                this.sw=1;
                break;

              default:
                if(this.sw==0)this.toastr.error(elemento.Description, "Registro fallido")
            }
          })
        }
      }
    )


  }

  ngOnInit() {
  }

}
