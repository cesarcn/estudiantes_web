import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExamenService } from 'src/app/service/examen.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lista-estudiante',
  templateUrl: './lista-estudiante.component.html',
  styleUrls: ['./lista-estudiante.component.css']
})
export class ListaEstudianteComponent implements OnInit {

  examenes : any;
  estudiantes: any;
  animalControl = new FormControl<any | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  examenControl = new FormControl('');
  constructor(private examservice: ExamenService, private userservice: UserService) { }

  ngOnInit(): void {
    this.examservice.listarExamen().subscribe(
      (dato:any)=>{
        this.examenes=dato;
        console.log(this.examenes)
      }
    )
    this.listarEstudiantes();
  }

  listarEstudiantes(): void {
    this.userservice.listarEstudiantes().subscribe(
      (dato:any)=>{
        this.estudiantes=dato;
        console.log(this.estudiantes)

      }
    )
  }

  asignarUsuarios(): void {
    console.log(this.animalControl)
    console.log(this.examenControl)
  }


  
}


