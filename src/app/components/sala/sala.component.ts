import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { JogadorComponent } from '../jogador/jogador.component';
import { ActivatedRoute } from '@angular/router';
import { JogadorService } from '../../services/jogador/jogador.service';
import { HistoricoPontuacao, Jogador, Sala } from '../../models/interface.models';
import { CommonModule, NgFor } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { SalaService } from '../../services/sala/sala.service';
import { HistoricoPontuacaoService } from '../../services/historico-pontuacao/historico-pontuacao.service';
import { MatIconModule } from '@angular/material/icon';

export interface Historico {
    jogador: Jogador;
    historico_pontuacao: HistoricoPontuacao[];
}


@Component({
    selector: 'app-sala',
    imports: [NgFor, CommonModule, MatTableModule, MatIconModule],
    templateUrl: './sala.component.html',
    styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {

    dialog = inject(MatDialog);
    rotaAtiva = inject(ActivatedRoute);

    jogadorService = inject(JogadorService);
    salaService = inject(SalaService);
    historicoPontuacaoService = inject(HistoricoPontuacaoService);

    displayedColumns: string[] = ['index', 'pontuacao', 'icone'];

    sala_id: string = this.rotaAtiva.snapshot.paramMap.get('id') || '';

    jogadores: Jogador[] = [];

    historicos: Historico[] = [];

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
        this.historicos = [];
        let params: HttpParams = new HttpParams().set('sala', this.sala_id);
        this.jogadorService.listar(params).subscribe({
            next: (jogadores: Jogador[]) => {
                this.jogadores = jogadores;
                this.listarHistoricoPontuacao(jogadores);
            }
        })
    }

    listarHistoricoPontuacao(jogadores: Jogador[]) {
        jogadores.forEach((jogador) => {
            let params: HttpParams = new HttpParams().set('jogador', jogador.id as string);
            this.historicoPontuacaoService.listar(params).subscribe({
                next: (historicos_pontuacoes: HistoricoPontuacao[]) => {
                    historicos_pontuacoes.forEach((element, index) => {
                        element.index = index + 1;
                    });
                    this.historicos.push({
                        jogador: jogador,
                        historico_pontuacao: historicos_pontuacoes
                    });
                }
            })
        });
    }

    deletaHistoricoPontuacao(historico_pontuacao: HistoricoPontuacao) {
        let jogador = this.jogadores.find(jogador => jogador.id == historico_pontuacao.jogador as any) as any;
        jogador.pontuacao = jogador.pontuacao - historico_pontuacao.pontuacao;
        this.historicoPontuacaoService.excluir(historico_pontuacao.id).subscribe({
            next: (resultado: any) => {
                this.jogadorService.editar(jogador).subscribe({
                    next: (jogador: Jogador) => {
                        this.listarJogadores();
                    }
                });
            }
        });
    }

}
