import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack:MatSnackBar, private logService:LoginService, private router:Router) { }

  public datalogin ={
    username :'',
    password :''
  }

  ngOnInit(): void {
  }

  loginSubmit (){
    if(this.datalogin.username.trim() == "" || this.datalogin.username == null){
      this.snack.open("El usuario debe ingresar un Usuario", "Aceptar",{duration:3000});
      return
    }

    if(this.datalogin.password.trim() == "" || this.datalogin.password == null){
      this.snack.open("El usuario debe ingresar una contraseña", "Aceptar",{duration:3000});
      return
    }

    this.logService.generartoken(this.datalogin).subscribe(
      (data:any)=>{
        console.log(data);
        
        this.logService.loginUser(data.token);
        this.logService.getCurrentUser().subscribe((user:any)=>{
          this.logService.setUser(user);
          console.log(user);
          
          if (this.logService.getUserRol() == 'Administradores'){
            this.router.navigate(["/admin"]);
          } else if (this.logService.getUserRol() == 'Estudiantes'){
          this.router.navigate(["/listarClientes"]);
          }
        })
        Swal.fire('Iniciando sesión','Inicio de sesión correctamente','success');

        })
      }
      


      
}


