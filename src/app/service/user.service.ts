import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import urlbase from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  public insertarusuario (user:any){
    return this.httpClient.post(`${urlbase}/usuario/registrarUsuario`, user);
  }


  public listarEstudiantes(){
    return this.httpClient.get(`${urlbase}/usuario/listarUsuario`,{ 
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
  });
  } 


}
