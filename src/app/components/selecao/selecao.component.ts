import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SalaService } from '../../services/sala/sala.service';
import { Router } from '@angular/router';
import { Sala } from '../../models/interface.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
    selector: 'app-selecao',
    imports: [
        MatCardModule,
        MatButtonModule,
        NgIf,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './selecao.component.html',
    styleUrl: './selecao.component.css'
})
export class SelecaoComponent implements OnInit {

    salaExistente: boolean = false;

    codigo_sala: FormControl = new FormControl(null);

    constructor(private salaService: SalaService, private router: Router) { }

    ngOnInit(): void {

    }

    novaSala() {
        let sala: Sala = { codigo: this.gerarCodigoSala(6) }
        this.salaService.criar(sala).subscribe({
            next: (resultado: Sala) => {
                this.router.navigate(['sala', resultado.id])
            }
        })
    }

    gerarCodigoSala(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    selecionaSalaExistente() {
        this.salaExistente = true;
    }

    buscarSala(){
        this.salaService.listar({codigo: this.codigo_sala.value}).subscribe({
            next: (salas: Sala[]) =>{
                if(salas.length > 0){
                    this.router.navigate(['sala', salas[0].id])
                }
            }
        })
    }
}
