import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor() { }

  public readonly rootURL = 'http://localhost:51090/api';

  public exRegularLetras: any = "^[a-zA-Z ]*$";
  public exRegularCorreo: any = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
  public exRegularNumeros: any = "^[0-9]*$";

  public readonly exRegularPassword:any = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d*[$@#$!%*?&].{5,19}";
  public readonly exLetrasNumeros: any = "^[0-9a-zA-Z]+$";

}
