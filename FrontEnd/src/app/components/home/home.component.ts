import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private usuarioService:UsuarioService) { }

  perfilUsuario;

  ngOnInit() {
    this.usuarioService.obtenerPerfil().subscribe(
      res=> {
        this.perfilUsuario = res;
      },
      err=>{
        console.log(err);
      }
    );
  }



  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('usuario/login');
  }


}
