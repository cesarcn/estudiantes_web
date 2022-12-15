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

  public datalogin ={
    username : '',
    password : ''
  }

  constructor(private snack:MatSnackBar, private logService:LoginService, public router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.datalogin);
    if(this.datalogin.username.trim() == "" || this.datalogin.username.trim() == null){
      this.snack.open("Debe ingresar un usuario", 'Aceptar',{duration:3000})
      return;
    }

    if(this.datalogin.password.trim() == "" || this.datalogin.password.trim() == null){
      this.snack.open("Debe ingresar una contraseña", 'Aceptar',{duration:3000})
      return;
    }

    this.logService.generartoken(this.datalogin).subscribe(
      (data:any)=>{
        console.log(data);
        this.logService.loginuser(data.token);
        this.logService.getCurrentUser().subscribe((user:any)=>{
          this.logService.setuser(user);
          console.log(user);


          if (this.logService.getUserRol() == 'administrador'){
            this.router.navigate(["admin"]);
            this.logService.loginStatusSubject.next(true);
          } else if (this.logService.getUserRol() == 'Cliente'){
          this.router.navigate(["/listarClientes"]);
          this.logService.loginStatusSubject.next(true);
          }
        })
        Swal.fire('Iniciando sesión','Inicio de sesión correctamente','success');
      }
    )


  }

}
