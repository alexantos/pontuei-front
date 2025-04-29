import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JogadorComponent } from '../jogador/jogador.component';
import { ActivatedRoute } from '@angular/router';
import { JogadorService } from '../../services/jogador/jogador.service';
import { Jogador, Sala } from '../../models/interface.models';
import { CommonModule, NgFor } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { SalaService } from '../../services/sala/sala.service';



@Component({
    selector: 'app-sala',
    imports: [NgFor, CommonModule],
    templateUrl: './sala.component.html',
    styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {
    dialog = inject(MatDialog);
    rotaAtiva = inject(ActivatedRoute);
    jogadorService = inject(JogadorService);
    salaService = inject(SalaService);

    sala_id: string = this.rotaAtiva.snapshot.paramMap.get('id') || '';

    jogadores: Jogador[] = [];

    codigo_sala: string = '';


    ngOnInit(): void {
        this.listarJogadores();
        this.buscarSala();
    }

    buscarSala() {
        this.salaService.pegarId(this.sala_id).subscribe({
            next: (resultado: Sala) => {
                this.codigo_sala = resultado.codigo;
            }
        })
    }

    abrirModalJogador(jogador?: Jogador) {
        const dialogRef = this.dialog.open(JogadorComponent, {
            width: '25em',
            data: {
                sala_id: this.sala_id,
                jogador: jogador
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.listarJogadores();
        });
    }

    listarJogadores() {
        let params: HttpParams = new HttpParams().set('sala', this.sala_id);
        this.jogadorService.listar(params).subscribe({
            next: (jogadores: Jogador[]) => {
                this.jogadores = jogadores;
            }
        })
    }

}
