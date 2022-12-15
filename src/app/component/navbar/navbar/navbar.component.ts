import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isloginEst = false;
  user:any = null;

  constructor(private login:LoginService) { }

  ngOnInit(): void {
    console.log();
    this.isloginEst = this.login.isloggin();
    this.user = this.login.getuser();
    this.login.loginStatusSubject.asObservable().subscribe(data =>{
      this.isloginEst = this.login.isloggin();
      this.user = this.login.getuser();
      console.log(this.isloginEst);
    })
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }




}
