import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { JogadorService } from '../../services/jogador/jogador.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';




@Component({
    selector: 'app-jogador',
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        FormsModule,
        NgIf,
    ],
    templateUrl: './jogador.component.html',
    styleUrl: './jogador.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JogadorComponent implements OnInit {

    readonly dialogRef = inject(MatDialogRef<JogadorComponent>);
    readonly data = inject(MAT_DIALOG_DATA);
    jogadorService = inject(JogadorService);

    somar: FormControl = new FormControl(true);

    jogador: FormGroup = new FormGroup({
        id: new FormControl(null, []),
        nome: new FormControl(null, [Validators.required]),
        pontuacao: new FormControl(null, [Validators.required]),
        cor: new FormControl('#ff5733', [Validators.required]),
        sala: new FormControl(this.data.sala_id, [Validators.required]),
    });

    ngOnInit(): void {
        if (this.data.jogador) this.jogador.patchValue(this.data.jogador); this.alteraSomar();
        this.somar.valueChanges.subscribe((value) => {
            this.alteraSomar();
        });
    }

    salvar() {
        if (!this.data.jogador) {
            this.jogadorService.criar(this.jogador.value).subscribe({
                next: (resultado) => {
                    this.fechar();
                }
            });
        } else {
            if (this.somar.value) {
                this.jogador.controls['pontuacao'].setValue(this.jogador.controls['pontuacao'].value + this.data.jogador.pontuacao)
            }
            this.jogadorService.editar(this.jogador.value).subscribe({
                next: (resultado) => {
                    this.fechar();
                }
            });
        }
    }

    alteraSomar() {
        if (this.somar.value) {
            this.jogador.controls['pontuacao'].setValue(0);
        } else {
            this.jogador.controls['pontuacao'].setValue(this.data.jogador.pontuacao);
        }
    }

    fechar() {
        this.dialogRef.close()
    }

}
