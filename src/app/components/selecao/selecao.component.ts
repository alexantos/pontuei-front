import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SalaService } from '../../services/sala/sala.service';
import { Router } from '@angular/router';
import { Sala } from '../../models/interface.models';



@Component({
    selector: 'app-selecao',
    imports: [
        MatCardModule,
        MatButtonModule,
    ],
    templateUrl: './selecao.component.html',
    styleUrl: './selecao.component.css'
})
export class SelecaoComponent implements OnInit {

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
}
